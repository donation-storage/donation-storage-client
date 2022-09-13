import { css } from '@emotion/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { fontNanumSquare } from '../styles/common';

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
  @media (max-width: 850px) {
    max-width: none;
  }
`;

interface Props {
  word?: string;
}

const MyPageSearch = ({ word }: Props) => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    if (router.isReady) {
      setSearchWord(word || '');
    }
  }, [word, router.isReady]);

  const enterToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const path = router.pathname.includes('/post')
        ? '/mypage/post'
        : '/mypage/like';

      if (searchWord.trim() === '') {
        setSearchWord('');

        return void router.push(path);
      }

      void router.push(`${path}?search=${searchWord}`);
    }
  };

  const clickToSearch = () => {
    const path = router.pathname.includes('/post')
      ? '/mypage/post'
      : '/mypage/like';

    if (searchWord.trim() === '') {
      setSearchWord('');

      return void router.push(path);
    }

    void router.push(`${path}?search=${searchWord}`);
  };

  return (
    <div css={container}>
      <div css={inputBox}>
        <input
          type="text"
          placeholder="검색..."
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          onKeyPress={(e) => {
            void enterToSearch(e);
          }}
        />
        <button onClick={clickToSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default MyPageSearch;
