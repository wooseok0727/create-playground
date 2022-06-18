import type { StoreSlice } from './index';

interface CloudsSlice {
  cloudsShouldReveal: boolean;
}

export const createCloudsSlice: StoreSlice<CloudsSlice> = () => ({
  cloudsShouldReveal: false,
});
