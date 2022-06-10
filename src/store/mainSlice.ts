import type { StoreSlice } from './index';

interface MainSlice {
  hasVistedLanding: boolean;
}

export const createMainSlice: StoreSlice<MainSlice> = () => ({
  hasVistedLanding: false,
});
