import { css } from '@emotion/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fontNanumSquare } from '../styles/common';
import type { AudioConfig, VideoConfig } from '../types/api';

const container = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 65px;
  padding: 30px;
`;

const inputBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 2px solid #919191;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.075);
  padding: 10px 20px;
  width: 100%;
  max-width: 250px;
  * {
    ${fontNanumSquare}
    color: #5b5b5b;
  }
  > input {
    width: 100%;
    ::placeholder {
      ${fontNanumSquare}
      color: #919191;
    }
  }
`;

interface Props {
  word: string;
  setWord: (word: string) => void;
  setData: (data: Array<AudioConfig | VideoConfig>) => void;
  setPage: (page: number) => void;
}

const MyPageSearch = ({ word, setWord }: Props) => (
  <div css={container}>
    <div css={inputBox}>
      <input
        type="text"
        placeholder="검색..."
        value={word}
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  </div>
);

export default MyPageSearch;
