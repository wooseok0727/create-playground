import { GetStaticProps } from 'next';

import { PageProps } from 'utils/sharedTypes';

export const getStaticProps: GetStaticProps = () => {
  const head: PageProps['head'] = {
    ogImage: '',
    title: 'Ripples',
    description: 'JOJO playGround 2022 WebGL | GLSL',
  };

  return {
    props: {
      head,
      repoHref: 'https://github.com/wooseok0727',
    },
  };
};
