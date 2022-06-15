import type { StoreSlice } from './index';

interface RipplesSlice {
  RipplesShouldReveal: boolean;
}

export const createRipplesSlice: StoreSlice<RipplesSlice> = () => ({
  RipplesShouldReveal: false,
});
