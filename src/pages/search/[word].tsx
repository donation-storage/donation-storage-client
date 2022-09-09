import type { NextPage } from 'next';

import { getServerSidePropsForPage } from '../../apis/ssr';
import Category from '../../components/Category';
import ListComponent from '../../components/ListComponent';
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
import type { PageProps } from '../../types/common';

export async function getServerSideProps(context: {
  params: { word: string };
  query: { page?: string };
}) {
  const start = Number(context.query.page) || 1;

  const pageData = await getServerSidePropsForPage({
    start,
    keyword: context.params.word,
  });

  return { props: { ...pageData.props, word: context.params.word } };
}

const Home: NextPage<PageProps> = ({ word, tags, list, page }) => (
  <div css={container}>
    <Nav tags={tags} selectedTag={''} />
    <Search searchWord={word} />
    <div css={mainContainer}>
      <section css={categorySection}>
        <Category />
      </section>
      <section css={listSection}>
        <ListComponent data={list} page={page} />
      </section>
      <section css={tagSection}>
        <TagComponent tags={tags} selectedTag={''} />
      </section>
    </div>
  </div>
);

export default Home;
