import styled, { css } from 'styled-components';
import { media } from 'utils/media';
import { s1 } from 'utils/sharedStyled';

interface ReadyWrapperProps {
  isReady: boolean;
}

export const ReadyWrapper = styled.div<ReadyWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  background-color: #fff;

  ${props =>
    props.isReady &&
    css`
      opacity: 0;
      user-select: none;
      pointer-events: none;
    `}
`;

export const AppBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-color: #fff;
`;

export const BackWrapper = styled.h1`
  position: fixed;
  z-index: 20;
  top: 10px;
  left: 20px;
  mix-blend-mode: difference;
  color: #fff;

  ${media.tabletPortrait} {
    top: 20px;
    left: 30px;
  }
`;

export const BackBtn = styled.button`
  display: inline-block;
  cursor: pointer;
  position: relative;
  width: 55px;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #fff;
    transform: translate(-50%, -50%);
    will-change: transform;
    transition: transform 0.7s cubic-bezier(0.64, 0.02, 0.16, 0.97);
  }

  &:hover {
    &:before {
      transform: translate(-50%, -50%) scale(1.1);
    }
    span {
      &:before {
        transform: scaleX(1);
      }
    }
  }
`;

export const BackBtnLabel = styled.span`
  ${s1}
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-48%, -50%);

  &:before {
    will-change: transform;
  }
`;
