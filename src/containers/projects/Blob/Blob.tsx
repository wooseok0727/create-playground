import { Head } from 'seo/Head/Head';
import { PageProps } from 'utils/sharedTypes';

import * as S from './Blob.styles';
import { useUIStore } from 'store';
import { useEffect } from 'react';
import { BlobSphere3D } from 'components/canvas/Blob/BlobSphere3D/BlobSphere3D';
import { Sphere3D } from 'components/canvas/Blob/Sphere3D/Sphere3D';

export default function Blob(props: PageProps) {
  const { head } = props;
  const shouldReveal = useUIStore(s => s.shouldReveal);

  useEffect(() => {
    useUIStore.setState({ shouldReveal: true });
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

Blob.r3f = (
  <>
    <BlobSphere3D />
    <Sphere3D />
  </>
);
