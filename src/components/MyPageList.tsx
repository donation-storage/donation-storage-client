/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import Paginate from '../items/Paginate';
import { fontNanumSquare, primaryColor } from '../styles/common';
import type { AudioConfig, VideoConfig } from '../types/api';
import { isYoutueUrl } from '../utills/common';

const container = css`
  display: flex;
  flex-direction: column;
  margin: 60px auto 0 auto;
  max-width: 800px;
  width: 90%;
  @media (max-width: 850px) {
    margin-top: 20px;
  }
`;

const titleBox = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  > h1 {
    ${fontNanumSquare}
    font-size: 24px;
  }
  > h2 {
    ${fontNanumSquare}
    font-size: 16px;
    color: #666666;
  }
  margin-bottom: 25px;
  @media (max-width: 850px) {
    > h1 {
      font-size: 20px;
    }
    > h2 {
      font-size: 14px;
    }
  }
`;

const listBox = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fefdff;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.075);
  padding: 10px 15px;
  gap: 1px;
  > div:not(:last-child) {
    border-bottom: 1px solid #e8e8e8;
  }
`;

const recordContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const likeBox = css`
  display: flex;
  gap: 5px;
  ${fontNanumSquare}
  font-size: 14px;
  cursor: pointer;
`;

interface Props {
  page: number;
  setPage: (page: number) => void;
  data: Array<AudioConfig | VideoConfig>;
  nickname: string;
  title: string;
}

const AudioRecord = ({ config }: { config: AudioConfig }) => {
  const router = useRouter();

  return (
    <div css={recordContainer}>
      <div css={recordBox}>
        <div css={flexRow}>
          <FontAwesomeIcon icon={faMusic} css={icon('#565656')} />
          <h1
            css={postNameStyle}
            onClick={() => {
              void router.push(`/view/${config.id}`);
            }}
          >
            {config.postName}
          </h1>
        </div>
        <div css={flexRow}>
          <span css={subInfoStyle}>[01:26]</span>
          <span css={subInfoStyle}>{config.createdAt}</span>
        </div>
      </div>
      <div css={recordBox}>
        <div css={tagBox}>
          {config.tags.map((tag, id) => (
            <span key={id}>#{tag.tagName}</span>
          ))}
        </div>
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

const VideoRecord = ({ config }: { config: VideoConfig }) => {
  const isYoutube = isYoutueUrl(config.url);
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
              void router.push(`/view/${config.id}`);
            }}
          >
            {config.postName}
          </h1>
        </div>
        <div css={flexRow}>
          <span css={subInfoStyle}>영상제목</span>
          <span css={subInfoStyle}>{config.createdAt}</span>
        </div>
      </div>
      <div css={recordBox}>
        <div css={tagBox}>
          {config.tags.map((tag, id) => (
            <span key={id}>#{tag.tagName}</span>
          ))}
        </div>
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

const MypageList = ({ data, page, setPage, nickname, title }: Props) => (
  <div css={container}>
    <div css={titleBox}>
      <h1>{nickname}</h1>
      <h2>{title}</h2>
    </div>
    <div css={listBox}>
      {data.map((record) =>
        record.type === 'audio' ? (
          <AudioRecord config={record} />
        ) : (
          <VideoRecord config={record} />
        ),
      )}
    </div>
    <Paginate page={page} count={100} setPage={setPage} itemsCountPerPage={5} />
  </div>
);

export default MypageList;
