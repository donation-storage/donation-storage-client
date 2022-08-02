import { css } from '@emotion/react';
import {
  faCircleXmark,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { displayNone, primaryColor } from '../styles/common';

const searchContainer = css`
  width: 70%;
  max-width: 600px;
  margin: 30px auto;
`;

const searchBox = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 30px;
  border: 2px solid ${primaryColor};
  border-radius: 50px;
  background-color: #fff;
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

const tagContainer = css`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const tag = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 5px;
  background-color: #e2e2e2;
  border-radius: 5px;
  font-size: 14px;
`;

const SearchHistoryTag = (props: {
  word: string;
  id: number;
  deleteSearchHistory: (id: number) => void;
}) => {
  const { word, id, deleteSearchHistory } = props;
  const router = useRouter();

  return (
    <button css={tag}>
      <span
        onClick={() => {
          void router.push(`/search/${word}`);
        }}
      >
        {word}
      </span>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => {
          deleteSearchHistory(id);
        }}
      />
    </button>
  );
};

interface Props {
  searchWord?: string;
}

const Search = ({ searchWord }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState(searchWord || '');
  const [searchHistory, setSearchHistory] = useLocalStorage(
    'searchHistory',
    [] as string[],
  );

  const deleteSearchHistory = (id: number) => {
    setSearchHistory(searchHistory!.filter((_, index) => index !== id));
  };

  const enterToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (search !== '') {
        const historySet = new Set([search, ...searchHistory!]);
        setSearchHistory([...historySet].slice(0, 10));
      }

      void router.push(`/search/${search}`);
    }
  };

  const clickToSearch = () => {
    if (search !== '') {
      const historySet = new Set([search, ...searchHistory!]);
      setSearchHistory([...historySet].slice(0, 10));
    }

    void router.push(`/search/${search}`);
  };

  return (
    <div css={searchContainer}>
      <div css={searchBox}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={(e) => {
            void enterToSearch(e);
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
          <button onClick={clickToSearch}>
            <FontAwesomeIcon icon={faSearch} css={button} />
          </button>
        </div>
      </div>
      <div css={tagContainer}>
        {searchHistory!.map((word, index) => (
          <SearchHistoryTag
            key={index}
            word={word}
            id={index}
            deleteSearchHistory={deleteSearchHistory}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
