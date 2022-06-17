import { Head } from 'seo/Head/Head';
import { PageProps } from 'utils/sharedTypes';

import * as S from './Cubes.styles';
import { useUIStore } from 'store';
import { useEffect } from 'react';
import { CubesBox3D } from 'components/canvas/cubesBox/CubesBox3D';

export default function Cubes(props: PageProps) {
  const { head } = props;
  const shouldReveal = useUIStore(s => s.cubesShouldReveal);

  useEffect(() => {
    useUIStore.setState({ cubesShouldReveal: true });
  }, []);

  useEffect(() => {
    useUIStore.setState({ orbitEnabled: true });

    return () => useUIStore.setState({ orbitEnabled: false });
  }, []);

  return (
    <>
      <Head {...head} />
      <S.ReadyWrapper shouldReveal={shouldReveal} />
    </>
  );
}

Cubes.r3f = (
  <>
    <CubesBox3D />
  </>
);
