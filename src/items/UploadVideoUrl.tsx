import { css } from '@emotion/react';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fontSCroreDream } from '../styles/common';

const container = css`
  margin-top: 50px;
`;

const inputContainer = css`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const inputUrlBox = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 330px;
  width: 100%;
  > input {
    ${fontSCroreDream}
    padding: 0 13px;
    border: 1px solid #e9e9e9;
    height: 30px;
  }
`;

const inputStartTimeBox = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  > div {
    display: flex;
    align-items: center;
    gap: 5px;
    ${fontSCroreDream}
    > input {
      border: 1px solid #e9e9e9;
      height: 30px;
      text-align: center;
      width: 40px;
      ::placeholder {
        color: #7a7a7a;
        ${fontSCroreDream}
        text-align: center;
      }
    }
  }
`;

const embedContainer = css`
  margin-top: 20px;
`;

const noneEmbedBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 640px;
  height: 360px;
  background-color: #f6f6f6;
  border-radius: 5px;
  color: #606060;
  font-weight: bold;
  gap: 10px;
`;

interface EmbedVideoProps {
  embedConfig: {
    status: string;
    id: string;
  };
}

const EmbedVideo = ({ embedConfig }: EmbedVideoProps) => {
  const { status, id } = embedConfig;

  if (status === 'failed') {
    return (
      <div css={noneEmbedBox}>
        <FontAwesomeIcon icon={faCircleExclamation} />
        <span>올바르지 않은 URL입니다.</span>
      </div>
    );
  }

  if (status === 'twitch/video') {
    return (
      <iframe
        src={`https://player.twitch.tv/?video=${id}&parent=${process.env.NEXT_PUBLIC_CLINET_DOMAIN}&autoplay=false`}
        height="360"
        width="640"
        allowFullScreen={true}
      ></iframe>
    );
  }

  if (status === 'twitch/clip') {
    return (
      <iframe
        src={`https://clips.twitch.tv/embed?clip=${id}&parent=${process.env.NEXT_PUBLIC_CLINET_DOMAIN}`}
        frameBorder="0"
        allowFullScreen={true}
        scrolling="no"
        height="360"
        width="640"
      ></iframe>
    );
  }

  if (status === 'youtube/video') {
    return (
      <iframe
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${id}?origin=http://${process.env.NEXT_PUBLIC_CLINET_DOMAIN}`}
        frameBorder="0"
      ></iframe>
    );
  }

  return (
    <div css={noneEmbedBox}>
      URL을 입력해주세요
      <br />
      트위치(클립, 비디오) 또는 유튜브 링크
    </div>
  );
};

interface Props {
  videoUrl: string;
  onChangeVideoUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  embedConfig: {
    status: string;
    id: string;
  };
  startHour: string;
  onChangeStartHour: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurStartHour: (e: React.FocusEvent<HTMLInputElement>) => void;
  startMinute: string;
  onChangeStartMinute: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurStartMinute: (e: React.FocusEvent<HTMLInputElement>) => void;
  startSecond: string;
  onChangeStartSecond: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurStartSecond: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const UploadVideoUrl = ({
  videoUrl,
  onChangeVideoUrl,
  embedConfig,
  startHour,
  onChangeStartHour,
  onBlurStartHour,
  startMinute,
  onChangeStartMinute,
  onBlurStartMinute,
  startSecond,
  onChangeStartSecond,
  onBlurStartSecond,
}: Props) => (
  <div css={container}>
    <div css={inputContainer}>
      <div css={inputUrlBox}>
        <label htmlFor="video-url">영상 URL</label>
        <input
          type="text"
          id="video-url"
          value={videoUrl}
          onChange={onChangeVideoUrl}
        />
      </div>
      <div css={inputStartTimeBox}>
        <label htmlFor="start-hour">시작시간</label>
        <div>
          <input
            type="text"
            id="start-hour"
            value={startHour}
            onChange={onChangeStartHour}
            onBlur={onBlurStartHour}
            placeholder="00"
            maxLength={2}
          />
          <span>:</span>
          <input
            type="text"
            id="start-minute"
            value={startMinute}
            onChange={onChangeStartMinute}
            onBlur={onBlurStartMinute}
            placeholder="00"
            maxLength={2}
          />
          <span>:</span>
          <input
            type="text"
            id="start-second"
            value={startSecond}
            onChange={onChangeStartSecond}
            onBlur={onBlurStartSecond}
            placeholder="00"
            maxLength={2}
          />
        </div>
      </div>
    </div>
    <div css={embedContainer}>
      <EmbedVideo embedConfig={embedConfig} />
    </div>
  </div>
);

export default UploadVideoUrl;
