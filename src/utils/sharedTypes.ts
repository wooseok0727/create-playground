import { NextComponentType } from 'next';
import type React from 'react';
import type { HeadProps } from 'seo/Head/Head';

export interface PageProps {
  head: HeadProps;
  repoHref?: string;
}

export type PageWithR3F = NextComponentType & {
  r3f: React.ReactNode;
};
