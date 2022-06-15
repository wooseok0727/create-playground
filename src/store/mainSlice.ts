import type { StoreSlice } from './index';

interface MainSlice {
  hasVistedLanding: boolean;
  selectCamera: 'PCamera' | 'OCamera';
  orbitEnabled: boolean;
  isReady: boolean;
}

export const createMainSlice: StoreSlice<MainSlice> = () => ({
  hasVistedLanding: false,
  orbitEnabled: false,
  isReady: false,
  selectCamera: 'PCamera',
});
