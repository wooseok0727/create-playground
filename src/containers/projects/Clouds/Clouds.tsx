import { Head } from 'seo/Head/Head';
import { PageProps } from 'utils/sharedTypes';

import * as S from './Clouds.styles';
import { useUIStore } from 'store';
import { useEffect } from 'react';
import { CloudsPlane3D } from 'components/canvas/clouds/CloudsPlane3D';

export default function Clouds(props: PageProps) {
  const { head } = props;
  const shouldReveal = useUIStore(s => s.cloudsShouldReveal);

  useEffect(() => {
    useUIStore.setState({ cloudsShouldReveal: true });
  }, []);

  return (
    <>
      <Head {...head} />
      <S.ReadyWrapper shouldReveal={shouldReveal} />
    </>
  );
}

Clouds.r3f = (
  <>
    <CloudsPlane3D />
  </>
);
