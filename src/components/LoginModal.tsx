import { css } from '@emotion/react';
import { useEffect } from 'react';

import { displayNone } from '../styles/common';

interface Props {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

const background = (isOpen: boolean) => css`
  ${!isOpen && displayNone}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

const modalContainer = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #d0cfcf;
  width: 100%;
  height: auto;
  padding-bottom: 10px;
  max-width: 350px;
  max-height: 400px;
  @media (max-width: 1023px) {
    border-radius: 7px;
    max-width: none;
    width: 95%;
  }
`;

const loginTitle = css`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  color: #363636;
  font-weight: 900;
  font-size: 16px;
`;

const loginButton = (color: string, logoWidth: string, left: string) => css`
  display: flex;
  width: 90%;
  height: 45px;
  margin: 5px 0;
  > button {
    display: flex;
    width: 100%;
    height: 45px;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    border: 1.2px solid ${color};
    > img {
      width: ${logoWidth};
      position: absolute;
      top: 50%;
      left: ${left};
      transform: translateY(-50%);
      border-radius: 3px;
    }
    > span {
      color: ${color};
      font-size: 14px;
      font-weight: 800;
    }
  }
`;

const LoginModal = ({ isOpen, modalRef }: Props) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <div css={background(isOpen)}>
      <div ref={modalRef} css={modalContainer}>
        <div css={loginTitle}>로그인</div>
        <a
          href={`${process.env.NEXT_PUBLIC_SERVER_API}/oauth2/authorization/twitch`}
          css={loginButton('#64449f', '26px', '15px')}
        >
          <button>
            <img src="/images/icon-twitch.png" alt="twitch" />
            <span>트위치 로그인</span>
          </button>
        </a>
        <a
          href={`${process.env.NEXT_PUBLIC_SERVER_API}/oauth2/authorization/naver`}
          css={loginButton('#00bf18', '25px', '15px')}
        >
          <button>
            <img src="/images/icon-naver.png" alt="naver" />
            <span>네이버 로그인</span>
          </button>
        </a>
        <a
          href={`${process.env.NEXT_PUBLIC_SERVER_API}/oauth2/authorization/google`}
          css={loginButton('#a0a0a0', '28px', '12.5px')}
        >
          <button>
            <img src="/images/icon-google.png" alt="google" />
            <span>구글 로그인</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default LoginModal;
