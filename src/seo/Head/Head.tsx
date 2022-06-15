import NextHead from 'next/head';
import { GoogleAnalytics } from 'seo/GoogleAnalytics/GoogleAnalytics';

export interface HeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export const Head = (props: HeadProps) => {
  const {
    title = 'PlayGround 2022',
    description = 'JOJO playGround 2022 WebGL | GLSL',
    ogImage = '/images/og.jpg',
  } = props;

  return (
    <NextHead>
      <title>{`JOJO - ${title}`}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`JOJO - ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`JOJO - ${title}`} />
      <meta name="twitter:description" content={description} />

      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      <GoogleAnalytics />
    </NextHead>
  );
};
