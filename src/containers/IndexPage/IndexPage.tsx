import { useUiStore } from 'store/store';
import { useEffect } from 'react';
import Link from 'next/link';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  const hasVistedLanding = useUiStore(s => s.hasVistedLanding);

  useEffect(() => {
    if (hasVistedLanding) return;
    useUiStore.setState({ hasVistedLanding: true });
  }, [hasVistedLanding]);

  return (
    <>
      <Head />
      <S.Wrapper>
        <S.ProjectsWrapper>
          <S.ProjectContainer>
            <Link href="/projects/1" passHref>
              <S.ProjectLink>1. one</S.ProjectLink>
            </Link>
          </S.ProjectContainer>
          <S.ProjectContainer>
            <Link href="/projects/2" passHref>
              <S.ProjectLink>2. two</S.ProjectLink>
            </Link>
          </S.ProjectContainer>
        </S.ProjectsWrapper>
      </S.Wrapper>
    </>
  );
}
