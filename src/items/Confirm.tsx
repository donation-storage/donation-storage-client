import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';

import {
  background,
  displayNone,
  fontSCroreDream,
  hidden,
  primaryColor,
} from '../styles/common';

const backgroundStyle = (isVisible: boolean) => css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  ${!isVisible && displayNone}
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const modalContainer = (isOpen: boolean, isVisible: boolean) => css`
  width: calc(100% - 10px);
  max-width: 400px;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  gap: 35px;
  ${!isVisible && hidden}
  animation: ${isOpen ? fadeInUp : fadeOutDown} 0.4s ease-in-out;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: 700;
`;

const buttonBox = css`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
`;

const buttonStyle = css`
  ${fontSCroreDream}
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  color: #ffffff;
  border-radius: 2px;
`;

interface Props {
  title?: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const Confirm = (props: Props) => {
  const {
    title,
    content,
    cancelText = '취소',
    confirmText = '확인',
    onCancel,
    onConfirm,
    isOpen,
  } = props;
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisable(true);
    } else {
      setTimeout(() => {
        setIsVisable(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <div css={backgroundStyle(isVisable)}>
      <div css={modalContainer(isOpen, isVisable)}>
        {title && <div css={titleStyle}>{title}</div>}
        <div>{content}</div>
        <div css={buttonBox}>
          <button
            onClick={() => {
              onCancel();
            }}
            css={[buttonStyle, background('#c8c8c8')]}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
            css={[buttonStyle, background(primaryColor)]}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
