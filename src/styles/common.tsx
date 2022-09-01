import { css } from '@emotion/react';

export const fontPyeongChangBold = css`
  font-family: 'PyeongChangPeace-Bold';
`;

export const fontPyeongChangLight = css`
  font-family: 'PyeongChangPeace-Light';
`;

export const fontSCroreDream = css`
  font-family: 'S-CoreDream-3Light';
`;

export const fontNanumSquare = css`
  font-family: 'NanumSquare';
`;

export const fontInfinity = css`
  font-family: 'InfinitySans-RegularA1';
`;

export const displayNone = css`
  display: none;
`;

export const largeTitle = css`
  font-family: 'PyeongChangPeace-Bold';
  font-size: 20px;
  color: #64449f;
  cursor: pointer;
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const primaryColor = '#64449f';

export const container = css`
  background-color: #f4f4f4;
  height: 100%;
  min-height: 100vh;
`;

export const mainContainer = css`
  display: flex;
`;

export const categorySection = css`
  flex: 1;
  height: 100%;
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const listSection = css`
  max-width: 900px;
  width: 100%;
  flex: 2;
  @media (max-width: 1023px) {
    max-width: 1023px;
  }
`;

export const tagSection = css`
  flex: 1;
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const relative = css`
  position: relative;
`;

export const hidden = css`
  visibility: hidden;
`;

export const background = (bgStyle: string) => css`
  background: ${bgStyle};
`;
