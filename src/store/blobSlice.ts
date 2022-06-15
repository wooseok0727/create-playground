import type { StoreSlice } from './index';

interface BlobSlice {
  BlobShouldReveal: boolean;
}

export const createBlobSlice: StoreSlice<BlobSlice> = () => ({
  BlobShouldReveal: false,
});
