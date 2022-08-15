/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { css } from '@emotion/react';
// import { faHeart as faHeartNone } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faEllipsisV,
  faHeart,
  faShareFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Dialog from '../items/Dialog';
import VideoEmbed from '../items/VideoEmbed';
import {
  fontNanumSquare,
  fontSCroreDream,
  primaryColor,
} from '../styles/common';
import type { AudioConfig, VideoConfig } from '../types/api';
import { isAudioConfig } from '../types/api';
import { formatStartTime, srcToFile } from '../utills/common';

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

const ViewComponent = (props: { data: VideoConfig | AudioConfig }) => {
  const { postName, tags, writer, createdAt, like } = props.data;
  const file = isAudioConfig(props.data) ? props.data.file : '';
  const url = !isAudioConfig(props.data) ? props.data.url : '';
  const startTime = !isAudioConfig(props.data) ? props.data.startTime : 0;
  const [hour, minute, second] = formatStartTime(startTime);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const download = async () => {
    const blob = await srcToFile(file, file.split('/').reverse()[0]);

    const fileUrl = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', file.split('/').reverse()[0]);

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
            {tags.map((tag, index) => (
              <span key={index}>#{tag.tagName}</span>
            ))}
          </div>
        </div>
        <div css={subTitleBox}>
          <div css={infoBox}>
            <div>{writer}</div>
            <div>{createdAt}</div>
          </div>
          <button>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
        <div css={contentBox}>
          {isAudioConfig(props.data) ? (
            <div css={audioBox}>
              <div css={fileInfo}>
                <span>{file.split('/').reverse()[0]}</span>
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
                <h3>URL</h3>
                <div>{url}</div>
                <h3>시작시간</h3>
                <div>
                  {hour} : {minute} : {second}
                </div>
                <button
                  onClick={() => {
                    copyVideoUrl();
                  }}
                >
                  URL 복사
                </button>
              </div>
              <VideoEmbed videoUrl={url} startTime={startTime} />
            </div>
          )}
        </div>
        <div css={funcBox}>
          <button>
            <span>{like}</span>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button>
            <FontAwesomeIcon icon={faShareFromSquare} />
          </button>
        </div>
      </div>
      <Dialog message="복사되었습니다." isOpen={isDialogOpen} />
    </>
  );
};

export default ViewComponent;