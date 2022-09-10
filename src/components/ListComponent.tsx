/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Paginate from '../items/Paginate';
import type { RootState } from '../redux/reducers';
import {
  fontNanumSquare,
  fontPyeongChangLight,
  primaryColor,
} from '../styles/common';
import type { PostConfig } from '../types/api';
import type { PageConfig } from '../types/common';
import { isYoutueUrl } from '../utills/common';
import LoginModal from './LoginModal';

const container = css`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  width: 90%;
`;

const uploadButton = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  > button {
    color: ${primaryColor};
    ${fontPyeongChangLight}
    font-size: 16px;
    font-weight: 700;
    border: 1px solid ${primaryColor};
    border-radius: 50px;
    padding: 5px 10px;
    background-color: white;
    :hover {
      transition: 0.2s;
      font-weight: bold;
      background-color: ${primaryColor};
      color: white;
    }
  }
`;

const listBox = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: #e4e4e4;
  overflow: hidden;
  border-radius: 3px;
  padding: 1px;
  gap: 1px;
`;

const recordContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fff;
  width: 100%;
  padding: 10px;
`;

const recordBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const flexRow = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const icon = (color: string) => css`
  color: ${color};
`;

const postNameStyle = css`
  font-size: 15px;
  ${fontNanumSquare}
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const subInfoStyle = css`
  ${fontNanumSquare}
  font-size: 13.5px;
  color: #565656;
  font-weight: 600;
`;

const tagBox = css`
  display: flex;
  gap: 5px;
  color: #575757;
  font-size: 13px;
  > span {
    background-color: #eeeeee;
    border-radius: 3px;
    padding: 2px 5px;
  }
`;

const writerStyle = css`
  padding-left: 5px;
  font-size: 13.5px;
  color: #575757;
  ${fontNanumSquare}
`;

const likeBox = css`
  display: flex;
  gap: 5px;
  ${fontNanumSquare}
  font-size: 14px;
  cursor: pointer;
`;

const noData = css`
  display: flex;
  align-items: center;
  height: 150px;
  color: #575757;
`;

interface Props {
  page: PageConfig;
  data: PostConfig[];
}

const AudioRecord = ({ config }: { config: PostConfig }) => {
  const router = useRouter();

  return (
    <div css={recordContainer}>
      <div css={recordBox}>
        <div css={flexRow}>
          <FontAwesomeIcon icon={faMusic} css={icon('#565656')} />
          <h1
            css={postNameStyle}
            onClick={() => {
              void router.push(`/view/${config.postSeq}`);
            }}
          >
            {config.postName}
          </h1>
        </div>
        <div css={flexRow}>
          <span css={subInfoStyle}>[01:26]</span>
          <span css={subInfoStyle}>{config.insertTime.slice(0, 10)}</span>
        </div>
      </div>
      <div css={tagBox}>
        {config.tag.map((tag, id) => (
          <span key={id}>#{tag}</span>
        ))}
      </div>
      <div css={recordBox}>
        <span css={writerStyle}>{config.insertUserId}</span>
        <span css={likeBox}>
          <FontAwesomeIcon
            icon={faHeart}
            css={css`
              color: #ee607a;
            `}
          />
          <span>{config.like}</span>
        </span>
      </div>
    </div>
  );
};

const VideoRecord = ({ config }: { config: PostConfig }) => {
  const isYoutube = isYoutueUrl(config.link);
  const router = useRouter();

  return (
    <div css={recordContainer}>
      <div css={recordBox}>
        <div css={flexRow}>
          <FontAwesomeIcon
            icon={isYoutube ? (faYoutube as any) : (faTwitch as any)}
            css={isYoutube ? icon('#ff0000') : icon(primaryColor)}
          />
          <h1
            css={postNameStyle}
            onClick={() => {
              void router.push(`/view/${config.postSeq}`);
            }}
          >
            {config.postName}
          </h1>
        </div>
        <div css={flexRow}>
          <span css={subInfoStyle}>영상제목</span>
          <span css={subInfoStyle}>{config.insertTime.slice(0, 10)}</span>
        </div>
      </div>
      <div css={tagBox}>
        {config.tag.map((tag, id) => (
          <span key={id}>#{tag}</span>
        ))}
      </div>
      <div css={recordBox}>
        <span css={writerStyle}>{config.insertUserId}</span>
        <span css={likeBox}>
          <FontAwesomeIcon
            icon={faHeart}
            css={css`
              color: #ee607a;
            `}
          />
          <span>{config.like}</span>
        </span>
      </div>
    </div>
  );
};

const ListComponent = ({ data, page }: Props) => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const loginModalRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const { isLogin } = useSelector((state: RootState) => state.loginReducer);

  const setPage = (pageTo: number) => {
    void router.push({
      pathname: router.asPath.split('?')[0],
      query: { page: pageTo },
    });
  };

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (
        !loginModalRef.current!.contains(target as Node) &&
        !loginButtonRef.current!.contains(target as Node)
      ) {
        setIsLoginModalOpen(false);
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

  const onUploadButtonClick = () => {
    if (isLogin) {
      void router.push('/upload');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div css={container}>
        <div css={uploadButton}>
          <button
            ref={loginButtonRef}
            onClick={() => {
              onUploadButtonClick();
            }}
          >
            등록
          </button>
        </div>
        <div css={listBox}>
          {data.length > 0 ? (
            data.map((record, index) =>
              record.type === 'audio' ? (
                <AudioRecord config={record} key={index} />
              ) : (
                <VideoRecord config={record} key={index} />
              ),
            )
          ) : (
            <div css={noData}>해당하는 게시물이 없습니다.</div>
          )}
        </div>
        <Paginate page={page.page} count={page.count} setPage={setPage} />
      </div>
      <LoginModal isOpen={isLoginModalOpen} modalRef={loginModalRef} />
    </>
  );
};

export default ListComponent;
