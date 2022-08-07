import { css } from '@emotion/react';

import { fontSCroreDream, primaryColor } from '../styles/common';

const backgroundStyle = css`
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
`;

const modalContainer = css`
  width: 100%;
  max-width: 400px;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  gap: 50px;
`;

const buttonStyle = css`
  ${fontSCroreDream}
  font-weight: bold;
  background-color: ${primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  color: #ffffff;
`;

interface Props {
  title?: string;
  content: string;
  buttonText?: string;
  onClose: () => void;
}

const Modal = (props: Props) => {
  const { title, content, buttonText = '확인', onClose } = props;

  return (
    <div css={backgroundStyle}>
      <div css={modalContainer}>
        {title && <div>{title}</div>}
        <div>{content}</div>
        <button
          onClick={() => {
            onClose();
          }}
          css={buttonStyle}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
