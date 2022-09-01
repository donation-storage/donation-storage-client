import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { fontNanumSquare, hidden } from '../styles/common';

const fadeIn = css`
  transition: opacity 0.4s ease;
`;

const fadeOut = css`
  opacity: 0;
  transition: opacity 0.4s ease;
`;

const container = (isOpen: boolean, isVisable: boolean) => css`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 300px;
  height: 100px;
  background-color: #1f1f1fd5;
  border-radius: 6px;
  color: #ffffff;
  ${fontNanumSquare}
  display: flex;
  align-items: center;
  justify-content: center;
  ${isOpen ? fadeIn : fadeOut}
  ${!isVisable && hidden}
`;

const Dialog = (props: { message: string; isOpen: boolean }) => {
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      setIsVisable(true);
    } else {
      setTimeout(() => {
        setIsVisable(false);
      }, 800);
    }
  }, [props.isOpen]);

  return <div css={container(props.isOpen, isVisable)}>{props.message}</div>;
};

export default Dialog;
