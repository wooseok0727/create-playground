import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUiStore } from 'store/store';
import { Footer } from '../Footer/Footer';

import * as S from './Layout.styles';

interface Props {
  isReady: boolean;
  children: React.ReactNode;
  repoHref?: string;
}

export const Layout = (props: Props) => {
  const { isReady, children, repoHref } = props;
  const router = useRouter();
  const hasVisitedLanding = useUiStore(s => s.hasVistedLanding);

  useEffect(() => {
    if (isReady && !document.body.classList.contains('isReady')) {
      document.body.classList.add('isReady');
    }

    return () => {
      document.body.classList.remove('isReady');
    };
  }, [isReady]);

  const handleBack = () => {
    hasVisitedLanding ? router.back() : void router.push({ pathname: '/' });
  };

  return (
    <>
      <S.ReadyWrapper isReady={isReady} />
      <S.AppBackground />
      {router.pathname !== '/' && (
        <S.BackWrapper>
          <S.BackBtn onClick={handleBack}>
            <S.BackBtnLabel>back</S.BackBtnLabel>
          </S.BackBtn>
        </S.BackWrapper>
      )}
      <Footer repoHref={repoHref} />
      {children}
    </>
  );
};
