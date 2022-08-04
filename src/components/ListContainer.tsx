/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import Paginate from '../items/Paginate';
import {
  fontNanumSquare,
  fontPyeongChangLight,
  primaryColor,
} from '../styles/common';
import type { AudioConfig, VideoConfig } from '../types/api';
import { isYoutueUrl } from '../utills/common';

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

interface Props {
  page: number;
  data: Array<AudioConfig | VideoConfig>;
}

const AudioRecord = ({ config }: { config: AudioConfig }) => (
  <div css={recordContainer}>
    <div css={recordBox}>
      <div css={flexRow}>
        <FontAwesomeIcon icon={faMusic} css={icon('#565656')} />
        <h1 css={postNameStyle}>{config.postName}</h1>{' '}
      </div>{' '}
      <div css={flexRow}>
        <span css={subInfoStyle}>[01:26]</span>
        <span css={subInfoStyle}>{config.createdAt}</span>
      </div>
    </div>
    <div css={tagBox}>
      {config.tags.map((tag, id) => (
        <span key={id}>#{tag.tagName}</span>
      ))}
    </div>
    <div css={recordBox}>
      <span css={writerStyle}>{config.writer}</span>
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

const VideoRecord = ({ config }: { config: VideoConfig }) => {
  const isYoutube = isYoutueUrl(config.url);

  return (
    <div css={recordContainer}>
      <div css={recordBox}>
        <div css={flexRow}>
          <FontAwesomeIcon
            icon={isYoutube ? (faYoutube as any) : (faTwitch as any)}
            css={isYoutube ? icon('#ff0000') : icon(primaryColor)}
          />
          <h1 css={postNameStyle}>{config.postName}</h1>{' '}
        </div>{' '}
        <div css={flexRow}>
          <span css={subInfoStyle}>영상제목</span>
          <span css={subInfoStyle}>{config.createdAt}</span>
        </div>
      </div>
      <div css={tagBox}>
        {config.tags.map((tag, id) => (
          <span key={id}>#{tag.tagName}</span>
        ))}
      </div>
      <div css={recordBox}>
        <span css={writerStyle}>{config.writer}</span>
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

const ListContainer = ({ data, page }: Props) => {
  const router = useRouter();

  const setPage = (pageTo: number) => {
    void router.push(`${router.asPath}?page=${pageTo}`);
  };

  return (
    <div css={container}>
      <div css={uploadButton}>
        <button>등록</button>
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
      <Paginate page={page} count={100} setPage={setPage} />
    </div>
  );
};

export default ListContainer;
