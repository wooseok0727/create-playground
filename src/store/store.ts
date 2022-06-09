import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface UIStore {
  hasVistedLanding: boolean;
}

export const useUiStore = create(
  subscribeWithSelector<UIStore>(() => ({
    hasVistedLanding: false,
  }))
);
