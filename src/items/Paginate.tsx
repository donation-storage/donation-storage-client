import { css } from '@emotion/react';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

import { fontNanumSquare, primaryColor } from '../styles/common';

interface Props {
  page: number;
  count: number;
  setPage: (page: number) => void;
  pageRangeDisplayed?: number;
  itemsCountPerPage?: number;
}

const paginationContainer = css`
  display: flex;
  .pagination {
    display: flex;
    justify-content: center;
    margin: 15px auto;
  }
  ul {
    background-color: #fefdff;
    list-style: none;
    padding: 5px 0;
    border-radius: 30px;
    box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.075);
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${fontNanumSquare}
    font-weight: 800;
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
    border-radius: 50%;
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

const Paginate = ({
  page = 1,
  count,
  setPage,
  itemsCountPerPage = 10,
  pageRangeDisplayed = 5,
}: Props) => (
  <div css={paginationContainer}>
    <Pagination
      activePage={page}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={count}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
      nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
      firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
      lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
      onChange={setPage}
    />
  </div>
);

export default Paginate;
