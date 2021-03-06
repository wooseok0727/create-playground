import { useUIStore } from 'store';
import { useEffect } from 'react';
import Link from 'next/link';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';
import { Vaporwave3D } from 'components/canvas/vaporwave/Vaporwave3D/Vaporwave3D';

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
            <Link href="/projects/ripples" passHref>
              <S.ProjectLink>1. Ripples</S.ProjectLink>
            </Link>
          </S.ProjectContainer>
          <S.ProjectContainer>
            <Link href="/projects/cubes" passHref>
              <S.ProjectLink>2. Cubes</S.ProjectLink>
            </Link>
          </S.ProjectContainer>
          <S.ProjectContainer>
            <Link href="/projects/clouds" passHref>
              <S.ProjectLink>3. Clouds</S.ProjectLink>
            </Link>
          </S.ProjectContainer>
          <S.ProjectContainer>
            <Link href="/projects/blob" passHref>
              <S.ProjectLink>4. Blob</S.ProjectLink>
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
