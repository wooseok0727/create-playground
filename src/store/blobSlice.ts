import type { StoreSlice } from './index';

interface BlobSlice {
  blobShouldReveal: boolean;
}

export const createBlobSlice: StoreSlice<BlobSlice> = () => ({
  blobShouldReveal: false,
});
