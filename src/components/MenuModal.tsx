/* eslint-disable unicorn/no-document-cookie */
import { css } from '@emotion/react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';

import { logoutApi } from '../apis/user';
import { logout } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import { fontNanumSquare, primaryColor } from '../styles/common';

const container = (isOpen: boolean) => css`
  display: ${isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9997;
  background-color: #fff;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 220px;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const menuBox = css`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 30px 20px;
  gap: 12px;
  > li {
    ${fontNanumSquare}
    font-size: 15px;
  }
`;

const mypageStyle = css`
  display: flex;
  align-items: center;
  gap: 5px;
  > span {
    ${fontNanumSquare}
    font-size: 16px;
  }
  > svg {
    font-size: 13px;
  }
`;

const subMenuBox = (isOpen: boolean) => css`
  display: ${isOpen ? 'flex' : 'none'};
  flex-direction: column;
  list-style: none;
  gap: 10px;
  padding: 0 12px;
`;

const subMenuStyle = (isSelected: boolean) => css`
  ${fontNanumSquare}
  font-size: 14px;
  font-weight: ${isSelected ? 600 : 500};
  color: ${isSelected ? primaryColor : '#5c5c5c'};
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
`;

interface Props {
  isOpen: boolean;
  modalRef: React.MutableRefObject<Array<HTMLDivElement | null>>;
  loginButtonRef: React.MutableRefObject<
    Array<HTMLDivElement | HTMLLIElement | null>
  >;
  openLoginModal: () => void;
}

const MenuModal = ({
  isOpen,
  modalRef,
  openLoginModal,
  loginButtonRef,
}: Props) => {
  const { isLogin } = useSelector((state: RootState) => state.loginReducer);
  const router = useRouter();
  const path = router.pathname;
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout() as unknown as AnyAction);
    void logoutApi();
    window.location.reload();
  };

  return (
    <div css={container(isOpen)} ref={(el) => (modalRef.current[0] = el)}>
      <ul css={menuBox}>
        {isLogin ? (
          <>
            <li
              css={mypageStyle}
              onClick={() => {
                setIsMyPageOpen((prev) => !prev);
              }}
            >
              <span>마이페이지</span>
              <FontAwesomeIcon icon={isMyPageOpen ? faAngleUp : faAngleDown} />
            </li>
            <ul css={subMenuBox(isMyPageOpen)}>
              <li
                css={subMenuStyle(path === '/mypage/post')}
                onClick={() => void router.push('/mypage/post')}
              >
                작성한 글
              </li>
              <li
                css={subMenuStyle(path === '/mypage/like')}
                onClick={() => void router.push('/mypage/like')}
              >
                좋아요한 글
              </li>
            </ul>
            <li
              onClick={() => {
                onLogout();
              }}
            >
              로그아웃
            </li>
          </>
        ) : (
          <li
            ref={(el) => (loginButtonRef.current[1] = el)}
            onClick={() => {
              openLoginModal();
            }}
          >
            로그인
          </li>
        )}
      </ul>
    </div>
  );
};

export default MenuModal;
