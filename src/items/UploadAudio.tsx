import { css } from '@emotion/react';

import { fontSCroreDream, primaryColor } from '../styles/common';

const container = css`
  margin-top: 50px;
`;

const fileBox = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const fileInput = css`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const fileUpload = css`
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  padding: 5px 8px;
  cursor: pointer;
  color: #fff;
  background-color: ${primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
`;

const fileName = css`
  ${fontSCroreDream}
`;

const audioplayerBox = css`
  margin: 20px 0;
`;

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  setDuration: (second: number) => void;
}

const UploadAudio = ({ file, setFile, setDuration }: Props) => (
  <div css={container}>
    <div css={fileBox}>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          setFile(e.target.files![0]);
        }}
        id="file-audio"
        css={fileInput}
        value=""
      />
      <label htmlFor="file-audio" css={fileUpload}>
        파일 업로드
      </label>
      <div css={fileName}>{file?.name || ''}</div>
    </div>
    <div css={audioplayerBox}>
      <audio
        src={file ? URL.createObjectURL(file) : ''}
        controls
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
        }}
      />
    </div>
  </div>
);

export default UploadAudio;
