/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { css } from '@emotion/react';
import { faHeart as faHeartNone } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faHeart,
  faShareFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { deleteLike, getIsLiked, getLikeCount, putLike } from '../apis/like';
import Confirm from '../items/Confirm';
import Dialog from '../items/Dialog';
import VideoEmbed from '../items/VideoEmbed';
import type { RootState } from '../redux/reducers';
import {
  fontNanumSquare,
  fontSCroreDream,
  primaryColor,
} from '../styles/common';
import type { PostConfig } from '../types/api';
import {
  formatStartTimeToNum,
  splitStartTime,
  srcToFile,
} from '../utills/common';
import { logger } from '../utills/logger';
import LoginModal from './LoginModal';

const container = css`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  width: 90%;
  background-color: #ffffff;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  * {
    ${fontNanumSquare}
  }
`;

const backButton = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 15px;
  width: 100px;
  font-size: 15px;
`;

const titleBox = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const title = css`
  font-size: 20px;
  margin-bottom: 10px;
`;

const tagBox = css`
  margin: 10px 0;
  display: flex;
  gap: 5px;
  color: #575757;
  font-size: 13px;
  > span {
    background-color: #eeeeee;
    border-radius: 3px;
    padding: 2px 5px;
    ${fontSCroreDream}
  }
`;

const subTitleBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;
`;

const infoBox = css`
  display: flex;
  gap: 10px;
  font-size: 13px;
`;

const contentBox = css`
  margin: 30px 0;
  min-height: 250px;
`;

const audioBox = css`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const videoBox = css`
  display: flex;
  flex-direction: column;
`;

const audio = css`
  margin: 0 auto;
`;

const writerBox = (isVisible: boolean) => css`
  display: ${isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  > button {
    color: #8b8b8b;
    font-weight: 700;
    &:hover {
      color: #303030;
    }
  }
`;

const fileInfo = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  > span {
    font-size: 13px;
  }
  > button {
    border-radius: 3px;
    border: 1px solid #e9e9e9;
    padding: 5px 8px;
    cursor: pointer;
    color: #fff;
    background-color: ${primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const videoInfoBox = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  > div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  h3 {
    background-color: #f0f0f0;
    color: #505050;
    padding: 2px 4px;
    border-radius: 3px;
  }
  div {
    font-size: 15px;
  }
  button {
    font-size: 15px;
    font-weight: 800;
    padding: 4px 6px;
    :hover {
      background-color: #e8e8e87e;
      border-radius: 4px;
      transition: 0.6s;
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const funcBox = css`
  display: flex;
  align-items: center;
  > button:nth-of-type(1) {
    flex: 3;
    border-right: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    > :nth-last-of-type(1) {
      color: #f4467a;
    }
  }
  > button:nth-of-type(2) {
    flex: 1;
  }
`;

const ViewComponent = (props: { data: PostConfig }) => {
  const { postName, tag, insertUserId, insertTime, like, type, postSeq } =
    props.data;
  const file = type === 'audio' ? props.data.link : '';
  const url = type !== 'audio' ? props.data.link : '';
  const startTime = type !== 'audio' ? props.data.startTime : '';
  const [hour, minute, second] = splitStartTime(startTime!);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const embedRef = useRef<HTMLDivElement>(null);
  const [embedWidth, setEmbedWidth] = useState(640);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const loginModalRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const { isLogin, userSeq, userName } = useSelector(
    (state: RootState) => state.loginReducer,
  );

  const getLike = useCallback(async () => {
    const [isLiked, likeCount] = await axios.all([
      await getIsLiked(userSeq, props.data.postSeq),
      await getLikeCount(props.data.postSeq),
    ]);

    setIsLiked(isLiked as boolean);
    setLikeCount(likeCount as number);
  }, [props.data.postSeq, userSeq]);

  useEffect(() => {
    if (isLogin) {
      void getLike();
    }
  }, [isLogin, getLike]);

  useEffect(() => {
    if (embedRef.current) {
      setEmbedWidth(
        embedRef.current.offsetWidth > 640 ? 640 : embedRef.current.offsetWidth,
      );
    }
  }, [embedRef]);

  const handleLike = async () => {
    if (!isLogin) {
      setIsLoginModalOpen(true);

      return;
    }

    await (isLiked
      ? deleteLike(userSeq, props.data.postSeq)
      : putLike(userSeq, props.data.postSeq));

    void getLike();
  };

  const formatFileName = () => {
    const fileName = file.split('/').reverse()[0];

    return decodeURIComponent(fileName);
  };

  const download = async () => {
    const blob = await srcToFile(file, formatFileName());

    const fileUrl = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', formatFileName());

    document.body.append(link);

    link.click();

    link.remove();
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 800);
  };

  const copyVideoUrl = () => {
    void navigator.clipboard.writeText(url);
    openDialog();
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

  return (
    <>
      <div css={container}>
        <button
          css={backButton}
          onClick={() => {
            router.back();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>목록으로</span>
        </button>
        <div css={titleBox}>
          <h1 css={title}>{postName}</h1>
          <div css={tagBox}>
            {tag.map((tagName, index) => (
              <span key={index}>#{tagName}</span>
            ))}
          </div>
        </div>
        <div css={subTitleBox}>
          <div css={infoBox}>
            <div>{insertUserId}</div>
            <div>{insertTime.slice(0, 10)}</div>
          </div>
          <div css={writerBox(insertUserId === userName)}>
            <button
              onClick={() => {
                void router.push(`/modify/${postSeq}`);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              삭제
            </button>
          </div>
        </div>
        <div css={contentBox}>
          {type === 'audio' ? (
            <div css={audioBox}>
              <div css={fileInfo}>
                <span>{formatFileName()}</span>
                <button
                  onClick={() => {
                    void download();
                  }}
                >
                  다운로드
                </button>
              </div>
              <audio src={file} controls css={audio} />
            </div>
          ) : (
            <div css={videoBox}>
              <div css={videoInfoBox}>
                <div>
                  <h3>URL</h3>
                  <div>{url}</div>
                </div>
                <div>
                  <h3>시작시간</h3>
                  <div>
                    {hour} : {minute} : {second}
                  </div>
                </div>
                <button
                  onClick={() => {
                    copyVideoUrl();
                  }}
                >
                  URL 복사
                </button>
              </div>
              <div ref={embedRef}>
                <VideoEmbed
                  videoUrl={url}
                  startTime={formatStartTimeToNum(startTime!)}
                  width={embedWidth}
                />
              </div>
            </div>
          )}
        </div>
        <div css={funcBox}>
          <button
            ref={loginButtonRef}
            onClick={() => {
              void handleLike();
            }}
          >
            <span>{likeCount}</span>
            <FontAwesomeIcon icon={isLiked ? faHeart : (faHeartNone as any)} />
          </button>
          <button>
            <FontAwesomeIcon icon={faShareFromSquare} />
          </button>
        </div>
      </div>
      <Dialog message="복사되었습니다." isOpen={isDialogOpen} />
      <Confirm
        title={'게시물 삭제'}
        content={'삭제하시겠습니까?'}
        cancelText={'취소'}
        confirmText={'삭제'}
        isOpen={isModalOpen}
        onConfirm={() => {
          logger.log('삭제');
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <LoginModal isOpen={isLoginModalOpen} modalRef={loginModalRef} />
    </>
  );
};

export default ViewComponent;
