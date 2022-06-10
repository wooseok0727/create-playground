import React from 'react';
import { LinkHandler } from '../LinkHandler/LinkHandler';
import * as S from './Footer.styles';

interface Props {
  repoHref?: string;
}

export const Footer = (props: Props) => {
  const { repoHref = 'https://github.com/wooseok0727' } = props;

  return (
    <>
      <S.GithubWrapper>
        <LinkHandler isExternal elHref={repoHref}>
          <S.GithubLink>Github repo</S.GithubLink>
        </LinkHandler>
      </S.GithubWrapper>
      <S.AuthorWrapper>
        <S.AuthorLink>JO JO</S.AuthorLink>
        playground 2022 - WebGL &#38; GLSL
      </S.AuthorWrapper>
    </>
  );
};
