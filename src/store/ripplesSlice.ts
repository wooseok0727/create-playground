import type { StoreSlice } from './index';

interface RipplesSlice {
  ripplesShouldReveal: boolean;
}

export const createRipplesSlice: StoreSlice<RipplesSlice> = () => ({
  ripplesShouldReveal: false,
});
