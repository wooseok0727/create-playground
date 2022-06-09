export const breakpoints = {
  tabletPortrait: 767,
  tabletLandscape: 992,
  desktop: 1920,
};

const customMediaQuery = (minWidth: number) =>
  `@media only screen and (min-width: ${minWidth / 16}em)`;

export const media = {
  custom: customMediaQuery,
  tabletPortrait: customMediaQuery(breakpoints.tabletPortrait),
  tabletLandscape: customMediaQuery(breakpoints.tabletLandscape),
  desktop: customMediaQuery(breakpoints.desktop),
};
