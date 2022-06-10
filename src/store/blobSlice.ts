import type { StoreSlice } from './index';

interface BlobSlice {
  shouldReveal: boolean;
}

export const createBlobSlice: StoreSlice<BlobSlice> = () => ({
  shouldReveal: false,
});
