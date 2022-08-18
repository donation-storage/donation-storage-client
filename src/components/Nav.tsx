import { css } from '@emotion/react';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../redux/reducers';
import { flexCenter, largeTitle } from '../styles/common';
import LoginModal from './LoginModal';
import MenuModal from './MenuModal';

const navContainer = css`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 60px;
  background-color: #fff;
  z-index: 9998;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  @media (max-width: 1023px) {
    padding: 0 20px;
    gap: 20px;
  }
`;

const menuButton = (isOpen: boolean) => css`
  width: 30px;
  * {
    color: #414141;
    font-size: ${isOpen ? '23px' : '20px'};
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;

const buttonBox = css`
  ${flexCenter}
  gap: 30px;
  margin-left: auto;
  > div {
    font-size: 16px;
    cursor: pointer;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

const Nav = () => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin } = useSelector((state: RootState) => state.loginReducer);

  const loginModalRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuModalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (
        !loginModalRef.current!.contains(target as Node) &&
        !loginButtonRef.current!.contains(target as Node)
      ) {
        setIsLoginModalOpen(false);
      }

      if (
        !menuButtonRef.current!.contains(target as Node) &&
        !menuModalRef.current!.contains(target as Node)
      ) {
        setIsMenuOpen(false);
      }
    },
    [setIsLoginModalOpen],
  );

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <header css={navContainer}>
        <button
          css={menuButton(isMenuOpen)}
          ref={menuButtonRef}
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </button>
        <div
          css={largeTitle}
          onClick={() => {
            void router.push('/');
          }}
        >
          도네저장소
        </div>
        <div css={buttonBox}>
          {isLogin ? (
            <>
              <div>마이페이지</div>
              <div>로그아웃</div>
            </>
          ) : (
            <div
              ref={loginButtonRef}
              onClick={() => {
                setIsLoginModalOpen(true);
              }}
            >
              로그인
            </div>
          )}
        </div>
      </header>
      <LoginModal isOpen={isLoginModalOpen} modalRef={loginModalRef} />
      <MenuModal isOpen={isMenuOpen} modalRef={menuModalRef} />
    </>
  );
};

export default Nav;
