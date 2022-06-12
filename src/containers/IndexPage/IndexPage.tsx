import { useUIStore } from 'store';
import { useEffect } from 'react';
import Link from 'next/link';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';
import { Vaporwave3D } from 'components/canvas/Vaporwave/Vaporwave3D/Vaporwave3D';

export default function IndexPage() {
  const hasVistedLanding = useUIStore(s => s.hasVistedLanding);

  useEffect(() => {
    if (hasVistedLanding) return;
    useUIStore.setState({ hasVistedLanding: true });
  }, [hasVistedLanding]);

  return (
    <>
      <Head />
      <S.Wrapper>
        <S.ProjectsWrapper>
          <S.ProjectContainer>
            <Link href="/projects/blob" passHref>
              <S.ProjectLink>1. Blob</S.ProjectLink>
            </Link>
          </S.ProjectContainer>
        </S.ProjectsWrapper>
      </S.Wrapper>
    </>
  );
}

IndexPage.r3f = (
  <>
    <Vaporwave3D />
  </>
);
