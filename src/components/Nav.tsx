import { css } from '@emotion/react';
import { faBars, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';

import { logout } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import { displayNone, flexCenter, largeTitle } from '../styles/common';
import FilterModal from './FilterModal';
import LoginModal from './LoginModal';
import MenuModal from './MenuModal';

const navContainer = css`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  min-height: 60px;
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

const filterButton = (isOpen: boolean, isVisible: boolean) => css`
  margin-left: auto;
  width: 30px;
  * {
    color: #807f7f;
    font-size: ${isOpen ? '23px' : '20px'};
  }
  ${!isVisible && displayNone}
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

interface Props {
  category?: 'video' | 'audio';
  selectedTag?: string;
  tags?: string[];
}

const Nav = ({ category, ...tagProps }: Props) => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isLogin } = useSelector((state: RootState) => state.loginReducer);

  const loginModalRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<Array<HTMLDivElement | HTMLLIElement | null>>(
    [],
  );
  const sideBarButtonRef = useRef<Array<HTMLButtonElement | null>>([]);
  const sideBarRef = useRef<Array<HTMLDivElement | null>>([]);
  const dispatch = useDispatch();

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (
        !loginModalRef.current!.contains(target as Node) &&
        !loginButtonRef.current.some((el) => el!.contains(target as Node))
      ) {
        setIsLoginModalOpen(false);
      }

      if (
        !sideBarButtonRef.current[0]!.contains(target as Node) &&
        !sideBarRef.current[0]!.contains(target as Node)
      ) {
        setIsMenuOpen(false);
      }

      if (
        !sideBarButtonRef.current[1]!.contains(target as Node) &&
        !sideBarRef.current[1]!.contains(target as Node)
      ) {
        setIsFilterOpen(false);
      }
    },
    [setIsLoginModalOpen, setIsMenuOpen, setIsFilterOpen],
  );

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false);
  };

  const onLogout = () => {
    dispatch(logout() as unknown as AnyAction);
    setCookie('accessToken', '', { maxAge: 0 });
    window.location.reload();
  };

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
          ref={(el) => (sideBarButtonRef.current[0] = el)}
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
              <div
                onClick={() => {
                  void router.push('/mypage/post');
                }}
              >
                마이페이지
              </div>
              <div
                onClick={() => {
                  onLogout();
                }}
              >
                로그아웃
              </div>
            </>
          ) : (
            <div
              ref={(el) => (loginButtonRef.current[0] = el)}
              onClick={() => {
                setIsLoginModalOpen(true);
              }}
            >
              로그인
            </div>
          )}
        </div>
        <button
          css={filterButton(isFilterOpen, !router.asPath.includes('/mypage'))}
          ref={(el) => (sideBarButtonRef.current[1] = el)}
          onClick={() => {
            setIsFilterOpen((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon={isFilterOpen ? faXmark : faFilter} />
        </button>
      </header>
      <LoginModal isOpen={isLoginModalOpen} modalRef={loginModalRef} />
      <MenuModal
        loginButtonRef={loginButtonRef}
        isOpen={isMenuOpen}
        modalRef={sideBarRef}
        openLoginModal={() => {
          openLoginModal();
        }}
      />
      <FilterModal
        isOpen={isFilterOpen}
        modalRef={sideBarRef}
        tags={tagProps.tags || []}
        selectedTag={tagProps.selectedTag || ''}
        category={category}
      />
    </>
  );
};

export default Nav;
