import axios from 'axios';
import type { NextPage } from 'next';

import Category from '../../components/Category';
import ListContainer from '../../components/ListContainer';
import Nav from '../../components/Nav';
import TagComponent from '../../components/TagComponent';
import Search from '../../items/Search';
import {
  categorySection,
  container,
  listSection,
  mainContainer,
  tagSection,
} from '../../styles/common';
import type { AudioConfig, VideoConfig } from '../../types/api';

interface Props {
  word: string;
  tags: string[];
  list: Array<AudioConfig | VideoConfig>;
  page: number;
}

export async function getServerSideProps(context: {
  params: { word: string };
  query: { page?: string };
}) {
  const endpoints = [
    `${process.env.NEXT_PUBLIC_SERVER_API}/tag`,
    `${process.env.NEXT_PUBLIC_SERVER_API}/list`,
  ];
  const [tagResponse, listResponse] = await axios.all(
    endpoints.map((endpoint) => axios.get(endpoint)),
  );

  return {
    props: {
      word: context.params.word,
      page: context.query.page ? Number(context.query.page) : 1,
      tags: tagResponse.data.data,
      list: listResponse.data.data,
    },
  };
}

const Home: NextPage<Props> = ({ word, tags, list, page }) => (
  <div css={container}>
    <Nav />
    <Search searchWord={word} />
    <div css={mainContainer}>
      <section css={categorySection}>
        <Category />
      </section>
      <section css={listSection}>
        <ListContainer data={list} page={page} />
      </section>
      <section css={tagSection}>
        <TagComponent tags={tags} selectedTag={''} />
      </section>
    </div>
  </div>
);

export default Home;
