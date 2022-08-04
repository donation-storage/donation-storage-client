import { css } from '@emotion/react';
import React from 'react';

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
  max-width: 300px;
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
    border: 1px solid #e9e9e9;
    height: 30px;
    padding: 0 13px;
    > input {
      padding: 0 4px;
      width: 30px;
      ::placeholder {
        color: #7a7a7a;
        ${fontSCroreDream}
        text-align: center;
      }
    }
  }
`;

interface Props {
  videoUrl: string;
  onChangeVideoUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startHour: string;
  onChangeStartHour: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startMinute: string;
  onChangeStartMinute: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startSecond: string;
  onChangeStartSecond: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadVideoUrl = ({
  videoUrl,
  onChangeVideoUrl,
  startHour,
  onChangeStartHour,
  startMinute,
  onChangeStartMinute,
  startSecond,
  onChangeStartSecond,
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
            placeholder="00"
            maxLength={2}
          />
          <span>:</span>
          <input
            type="text"
            id="start-minute"
            value={startMinute}
            onChange={onChangeStartMinute}
            placeholder="00"
            maxLength={2}
          />
          <span>:</span>
          <input
            type="text"
            id="start-second"
            value={startSecond}
            onChange={onChangeStartSecond}
            placeholder="00"
            maxLength={2}
          />
        </div>
      </div>
    </div>
    <div></div>
  </div>
);

export default UploadVideoUrl;
