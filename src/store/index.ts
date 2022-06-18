import create, { GetState, SetState } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createMainSlice } from './mainSlice';
import { createBlobSlice } from './blobSlice';
import { createRipplesSlice } from './ripplesSlice';
import { createCubesSlice } from './cubesSlice';
import { createCloudsSlice } from './cloudsSlice';

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createMainSlice(set, get),
  ...createBlobSlice(set, get),
  ...createRipplesSlice(set, get),
  ...createCubesSlice(set, get),
  ...createCloudsSlice(set, get),
});

const useUIStore = create(subscribeWithSelector(createRootSlice));

export { useUIStore, useUIStore as uiStore };
