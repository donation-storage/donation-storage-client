import { css } from '@emotion/react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import {
  fontNanumSquare,
  fontPyeongChangBold,
  primaryColor,
} from '../styles/common';

const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const menuSection = css`
  min-width: 300px;
  height: 100%;
  background-color: #fefdff;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.075);
  z-index: 1;
`;

const logoBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 65px;
  background-color: ${primaryColor};
  * {
    ${fontPyeongChangBold}
  }
  > button:first-of-type {
    color: #fefdff;
    display: flex;
    align-items: center;
    gap: 5px;
    > span:first-of-type {
      font-size: 30px;
    }
    > span:last-of-type {
      font-size: 17px;
    }
  }
  > button:last-of-type {
    font-size: 20px;
    color: #afafaf;
    &:hover {
      color: #fefdff;
    }
  }
`;

const menuContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 65px);
`;

const menuBox = css`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-top: 20px;
`;

const menuStyle = (isSelected: boolean) => css`
  margin-left: 25px;
  padding: 10px 10px;
  ${fontNanumSquare}
  font-weight: ${isSelected ? 600 : 500};
  color: ${isSelected ? '#2c2c2c' : '#5c5c5c'};
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const withdrawalButton = css`
  margin: 0px 30px 20px auto;
  ${fontNanumSquare}
  font-weight: 100;
  color: #7e7e7e;
`;

const contentSection = css`
  width: 100%;
  height: 100%;
  background-color: #f7fafb;
`;

interface Props {
  children?: React.ReactNode;
  path: 'posted' | 'liked';
}

const MyPageSideBar: React.FC<Props> = ({ children, path }) => {
  const router = useRouter();

  return (
    <div css={container}>
      <section css={menuSection}>
        <div css={logoBox}>
          <button
            onClick={() => {
              void router.push('/');
            }}
          >
            <span>D</span>
            <span>도네저장소</span>
          </button>
          <button>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </div>
        <div css={menuContainer}>
          <ul css={menuBox}>
            <li
              css={menuStyle(path === 'posted')}
              onClick={() => void router.push('/mypage/post')}
            >
              작성한 글
            </li>
            <li
              css={menuStyle(path === 'liked')}
              onClick={() => void router.push('/mypage/like')}
            >
              좋아요한 글
            </li>
          </ul>
          <button css={withdrawalButton}>회원탈퇴</button>
        </div>
      </section>
      <section css={contentSection}>{children}</section>
    </div>
  );
};

export default MyPageSideBar;
