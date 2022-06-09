import { createGlobalStyle } from 'styled-components';

import { media } from 'utils/media';

// 크롬에서는 font size에 최소 크기가 정해져 있다 10px
export const GlobalStyle = createGlobalStyle`
  html {
    font-size: calc(100vw / 375 * 10);

    ${media.tabletPortrait} {
      font-size: calc(100vw / 1920 * 10);
    }

    ${media.desktop} {
      font-size: 62.5%;
    }
  }
`;
