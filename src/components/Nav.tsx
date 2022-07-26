import { css } from '@emotion/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Search from '../items/Search';
import type { RootState } from '../redux/reducers';
import { flexCenter, largeTitle } from '../styles/common';
import LoginModal from './LoginModal';

const navContainer = css`
  position: fixed;
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
  justify-content: space-between;
`;

const buttonBox = css`
  ${flexCenter}
  gap: 30px;
  > div {
    font-size: 16px;
    cursor: pointer;
  }
`;

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useSelector((state: RootState) => state.loginReducer);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const loginRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (modalRef.current === null || loginRef.current === null) {
        return;
      }

      if (
        !modalRef.current.contains(target as Node) &&
        !loginRef.current.contains(target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
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
        <Search />
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
              ref={loginRef}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              로그인
            </div>
          )}
        </div>
      </header>
      <LoginModal isOpen={isOpen} modalRef={modalRef} />
    </>
  );
};

export default Nav;
