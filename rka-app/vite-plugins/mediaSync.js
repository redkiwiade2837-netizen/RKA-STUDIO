// Scans the sibling Projects/Furniture/Items folders (repo root, outside
// this app) directly with Node's fs — import.meta.glob only sees files
// that already exist, so it can't tell us a product folder exists before
// any photo has been dropped into it. This plugin walks the directories
// itself, copies whatever photos it finds into public/media, and writes a
// manifest that src/data/media.js reads. In dev it also watches the three
// folders and re-syncs (with a full reload) whenever something changes —
// add/rename a folder, drop in a photo — no restart needed.
import fs from 'node:fs';
import path from 'node:path';

const CATEGORIES = [
  ['Projects', 'projects'],
  ['Furniture', 'furniture'],
  ['Items', 'items'],
];

const FOLDER_NAME_RE = /^(\d+)\s+(.+)$/;
const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

function findFirstImage(dir) {
  if (!fs.existsSync(dir)) return null;
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && IMAGE_RE.test(d.name))
    .map((d) => d.name)
    .sort();
  return files[0] || null;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'product';
}

export function mediaSyncPlugin() {
  // This file lives in rka-app/vite-plugins, so the app root is one level
  // up, and the repo root (where Projects/Furniture/Items live) is two.
  const appRoot = path.resolve(import.meta.dirname, '..');
  const repoRoot = path.resolve(appRoot, '..');
  const publicMediaDir = path.resolve(appRoot, 'public/media');
  const manifestPath = path.resolve(appRoot, 'src/data/media.generated.json');

  function syncMedia() {
    const manifest = {};

    fs.rmSync(publicMediaDir, { recursive: true, force: true });

    for (const [folderName, key] of CATEGORIES) {
      const categoryDir = path.join(repoRoot, folderName);
      const products = [];

      if (fs.existsSync(categoryDir)) {
        const entries = fs
          .readdirSync(categoryDir, { withFileTypes: true })
          .filter((d) => d.isDirectory());

        for (const entry of entries) {
          const match = entry.name.match(FOLDER_NAME_RE);
          if (!match) continue;
          const [, number, title] = match;

          const productDir = path.join(categoryDir, entry.name);
          const leftFile = findFirstImage(path.join(productDir, 'Left'));
          const rightFile = findFirstImage(path.join(productDir, 'Right'));
          const slug = `${number}-${slugify(title)}`;
          const destDir = path.join(publicMediaDir, key, slug);

          let img = null;
          let imgHover = null;

          if (leftFile || rightFile) fs.mkdirSync(destDir, { recursive: true });

          if (leftFile) {
            const ext = path.extname(leftFile);
            fs.copyFileSync(path.join(productDir, 'Left', leftFile), path.join(destDir, `left${ext}`));
            img = `/media/${key}/${slug}/left${ext}`;
          }
          if (rightFile) {
            const ext = path.extname(rightFile);
            fs.copyFileSync(path.join(productDir, 'Right', rightFile), path.join(destDir, `right${ext}`));
            imgHover = `/media/${key}/${slug}/right${ext}`;
          }

          products.push({ number, title, img, imgHover });
        }
      }

      manifest[key] = products;
    }

    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  }

  return {
    name: 'rka-media-sync',
    buildStart() {
      syncMedia();
    },
    configureServer(server) {
      syncMedia();

      const watchers = CATEGORIES.map(([folderName]) => {
        const dir = path.join(repoRoot, folderName);
        if (!fs.existsSync(dir)) return null;
        return fs.watch(dir, { recursive: true }, () => {
          syncMedia();
          server.ws.send({ type: 'full-reload' });
        });
      });

      server.httpServer?.once('close', () => {
        watchers.forEach((w) => w && w.close());
      });
    },
  };
}
