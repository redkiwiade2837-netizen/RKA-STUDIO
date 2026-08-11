// Single source of truth for top-level site sections. Header reads this to
// render its nav links, and ContactPage reads the same list (minus About) to
// build its inquiry-category dropdown — so adding/removing a section here
// updates both places at once instead of drifting out of sync.
export const NAV_ITEMS = [
  { label: 'Projects', path: '/projects', exact: true },
  { label: 'Furniture', path: '/furniture' },
  { label: 'Items', path: '/items' },
  { label: 'About', path: '/about', exact: true },
];
