import styled from 'styled-components';
import { media } from 'utils/media';
import { s1 } from 'utils/sharedStyled';

export const GithubWrapper = styled.div`
  position: fixed;
  z-index: 20;
  bottom: 0;
  left: 0;
  mix-blend-mode: difference;
  color: #fff;
  transform-origin: bottom left;
  transform: rotate(-90deg) translateY(calc(100% + 16px)) translateX(15px);

  ${media.tabletPortrait} {
    transform: none;
    bottom: 20px;
    left: 30px;
  }
`;

export const AuthorWrapper = styled.h1`
  position: fixed;
  z-index: 20;
  bottom: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  mix-blend-mode: difference;
  color: #fff;
  ${s1}
  letter-spacing: 1px;

  ${media.tabletPortrait} {
    bottom: 20px;
    right: 30px;
  }
`;

export const GithubLink = styled.span`
  display: inline-block;
  position: relative;
  ${s1}
`;

export const AuthorLink = styled.span`
  display: inline-block;
  font-weight: 700;
  position: relative;
  margin-right: 5px;
`;
