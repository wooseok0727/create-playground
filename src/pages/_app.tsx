import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GlobalStyle } from 'utils/GlobalStyles';
import { Layout } from 'components/dom/Layout/Layout';

import type { PageProps } from 'utils/sharedTypes';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Layout isReady={isReady} repoHref={(pageProps as PageProps).repoHref}>
        <Component router={router} {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
