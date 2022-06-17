import type { StoreSlice } from './index';

interface CubesSlice {
  cubesShouldReveal: boolean;
}

export const createCubesSlice: StoreSlice<CubesSlice> = () => ({
  cubesShouldReveal: false,
});
