import { Head } from 'seo/Head/Head';
import { PageProps } from 'utils/sharedTypes';

import * as S from './Ripples.styles';
import { useUIStore } from 'store';
import { useEffect } from 'react';
import { RipplesPlane3D } from 'components/canvas/ripplesPlane/RipplesPlane3D';

export default function Ripples(props: PageProps) {
  const { head } = props;
  const shouldReveal = useUIStore(s => s.RipplesShouldReveal);

  useEffect(() => {
    useUIStore.setState({ RipplesShouldReveal: true });
  }, []);

  useEffect(() => {
    useUIStore.setState({ selectCamera: 'OCamera' });

    return () => useUIStore.setState({ selectCamera: 'PCamera' });
  }, []);

  return (
    <>
      <Head {...head} />
      <S.ReadyWrapper shouldReveal={shouldReveal} />
    </>
  );
}

Ripples.r3f = (
  <>
    <RipplesPlane3D />
  </>
);
