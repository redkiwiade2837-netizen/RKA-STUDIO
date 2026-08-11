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
// A file named like "(.1.).jpg" marks the thumbnail shown on the index card
// (and its hover swap) — kept separate from the numbered sequence below so
// picking a thumbnail doesn't also consume slot 1 of the gallery.
const MARKER_RE = /^\(\.\d+\.\)$/;
// Files named "1", "2", "10"... form the ordered gallery for the detail
// page. Sorted numerically — plain alphabetical sort would put "10" before
// "2".
const NUMBERED_RE = /^\d+$/;

function stripExt(filename) {
  return filename.replace(/\.[^.]+$/, '');
}

// Splits a folder's images into: the single marker file used as the index
// thumbnail, and the numerically-ordered sequence used for gallery cycling.
function readImageFolder(dir) {
  if (!fs.existsSync(dir)) return { marker: null, sequence: [] };

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && IMAGE_RE.test(d.name))
    .map((d) => d.name);

  let marker = null;
  const numbered = [];
  for (const name of files) {
    const base = stripExt(name);
    if (MARKER_RE.test(base)) {
      if (!marker) marker = name;
    } else if (NUMBERED_RE.test(base)) {
      numbered.push({ n: Number(base), name });
    }
  }
  numbered.sort((a, b) => a.n - b.n);
  const sequence = numbered.map((f) => f.name);

  // No (.N.) marker: fall back to the first numbered file, then to
  // whatever image sorts first — keeps folders that don't use the marker
  // convention (e.g. a single unnumbered photo) working as before.
  if (!marker) marker = sequence[0] || files.slice().sort()[0] || null;

  return { marker, sequence };
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
          const left = readImageFolder(path.join(productDir, 'Left'));
          const right = readImageFolder(path.join(productDir, 'Right'));
          const slug = `${number}-${slugify(title)}`;
          const destDir = path.join(publicMediaDir, key, slug);

          const hasAnyImage = left.marker || right.marker || left.sequence.length || right.sequence.length;
          if (hasAnyImage) fs.mkdirSync(destDir, { recursive: true });

          let img = null;
          let imgHover = null;

          if (left.marker) {
            const ext = path.extname(left.marker);
            fs.copyFileSync(path.join(productDir, 'Left', left.marker), path.join(destDir, `left${ext}`));
            img = `/media/${key}/${slug}/left${ext}`;
          }
          if (right.marker) {
            const ext = path.extname(right.marker);
            fs.copyFileSync(path.join(productDir, 'Right', right.marker), path.join(destDir, `right${ext}`));
            imgHover = `/media/${key}/${slug}/right${ext}`;
          }

          const photos = left.sequence.map((name, i) => {
            const ext = path.extname(name);
            const destName = `left-${i + 1}${ext}`;
            fs.copyFileSync(path.join(productDir, 'Left', name), path.join(destDir, destName));
            return `/media/${key}/${slug}/${destName}`;
          });
          const drawings = right.sequence.map((name, i) => {
            const ext = path.extname(name);
            const destName = `right-${i + 1}${ext}`;
            fs.copyFileSync(path.join(productDir, 'Right', name), path.join(destDir, destName));
            return `/media/${key}/${slug}/${destName}`;
          });

          products.push({ number, title, img, imgHover, photos, drawings });
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
