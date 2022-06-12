import type { StoreSlice } from './index';

interface MainSlice {
  hasVistedLanding: boolean;
  orbitEnabled: boolean;
  isReady: boolean;
}

export const createMainSlice: StoreSlice<MainSlice> = () => ({
  hasVistedLanding: false,
  orbitEnabled: false,
  isReady: false,
});
