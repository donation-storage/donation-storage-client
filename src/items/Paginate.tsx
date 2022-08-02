import { css } from '@emotion/react';
import Pagination from 'react-js-pagination';

import { primaryColor } from '../styles/common';

interface Props {
  page: number;
  count: number;
  setPage: (page: number) => void;
}

const paginationContainer = css`
  .pagination {
    display: flex;
    justify-content: center;
    margin: 15px auto;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 30px 0 0 30px;
  }
  ul.pagination li:last-child {
    border-radius: 0 30px 30px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: ${primaryColor};
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: ${primaryColor};
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: ${primaryColor};
  }
  .page-selection {
    width: 48px;
    height: 30px;
    color: ${primaryColor};
  }
`;

const Paginate = ({ page, count, setPage }: Props) => (
  <div css={paginationContainer}>
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  </div>
);

export default Paginate;
