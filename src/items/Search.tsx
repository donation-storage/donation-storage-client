import { css } from '@emotion/react';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { displayNone, primaryColor } from '../styles/common';

const searchContainer = css`
  width: 40%;
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 30px;
  border: 2px solid ${primaryColor};
  border-radius: 50px;
  input {
    width: 100%;
  }
`;

const buttonGroup = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const xButtonBox = (isVisible: boolean) => css`
  ${!isVisible && displayNone}
`;

const xButton = css`
  width: 15px;
  height: 15px;
  color: #bebebe;
`;

const button = css`
  width: 20px;
  height: 20px;
  color: ${primaryColor};
`;

const Search = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isReady) {
      setSearch(query.word as string);
    }
  }, [query, isReady]);

  const moveToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void router.push(`/search/${search}`);
    }
  };

  return (
    <div css={searchContainer}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          void moveToSearch(e);
        }}
      />
      <div css={buttonGroup}>
        <button
          css={xButtonBox(search !== '')}
          onClick={() => {
            setSearch('');
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} css={xButton} />
        </button>
        <button
          onClick={() => {
            void router.push(`/search/${search}`);
          }}
        >
          <FontAwesomeIcon icon={faSearch} css={button} />
        </button>
      </div>
    </div>
  );
};

export default Search;
