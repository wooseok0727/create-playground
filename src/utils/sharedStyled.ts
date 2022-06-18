import { css, keyframes } from 'styled-components';
import { media } from './media';

export const s1 = css`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  ${media.tabletPortrait} {
    font-size: 18px;
  }
`;

export const m1 = css`
  font-size: 2.5rem;
  line-height: 1.4;
`;

export const m2 = css`
  font-size: 3rem;
  line-height: 2;
  ${media.tabletPortrait} {
    font-size: 4.5rem;
  }
`;

export const splash = keyframes`
    0% {
    opacity: 1;
    transform: scale(1);
  }
  20% {
    opacity: 0;
    transform: scale(0.5);
  }
  30% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
