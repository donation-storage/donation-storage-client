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
  params: { category: string };
  query: { page?: string };
}) {
  const start = context.query.page ? Number(context.query.page) : 1;

  const pageData = await getServerSidePropsForPage({ start });

  return { props: { ...pageData.props, category: context.params.category } };
}

const Home: NextPage<PageProps> = ({ category, tags, list, page }) => (
  <div css={container}>
    <Nav tags={tags} selectedTag={''} category={category} />
    <Search />
    <div css={mainContainer}>
      <section css={categorySection}>
        <Category category={category} />
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
