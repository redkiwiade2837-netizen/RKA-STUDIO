// Reads the manifest written by vite-plugins/mediaSync.js, which scans the
// sibling Projects/Furniture/Items folders (repo root, outside this app).
// Renaming a product folder there changes its number/title here; dropping a
// photo into its Left/Right folder changes its image — both without code
// changes. See media.generated.json (auto-generated, do not edit by hand).
import placeholder from '../assets/placeholder.svg';
import manifest from './media.generated.json';

function withPlaceholders(products) {
  return products
    .map(({ number, title, img, imgHover, photos, drawings }) => ({
      number,
      title,
      img: img || placeholder,
      imgHover: imgHover || img || placeholder,
      // Full numbered galleries (Left -> photos, Right -> drawings) for
      // detail-page cycling — empty unless the folder uses "1", "2"... files.
      photos: photos || [],
      drawings: drawings || [],
    }))
    .sort((a, b) => Number(b.number) - Number(a.number));
}

export const projectsMedia = withPlaceholders(manifest.projects || []);
export const furnitureMedia = withPlaceholders(manifest.furniture || []);
export const itemsMedia = withPlaceholders(manifest.items || []);
