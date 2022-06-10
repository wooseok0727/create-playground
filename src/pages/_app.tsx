import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GlobalStyle } from 'utils/GlobalStyles';
import { Layout } from 'components/dom/Layout/Layout';
import { LCanvas } from 'components/canvas/LCanvas/LCanvas';

import type { PageProps, PageWithR3F } from 'utils/sharedTypes';

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
        <LCanvas>{(Component as PageWithR3F).r3f}</LCanvas>
      </Layout>
    </>
  );
}

export default MyApp;
