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
  params: { tag: string };
  query: { page?: string };
}) {
  const start = Number(context.query.page) || 1;

  const pageData = await getServerSidePropsForPage({
    start,
    keyword: context.params.tag,
  });

  return { props: { ...pageData.props, selectedTag: context.params.tag } };
}

const Tag: NextPage<PageProps> = ({ selectedTag, tags, list, page }) => (
  <div css={container}>
    <Nav tags={tags} selectedTag={selectedTag} />
    <Search />
    <div css={mainContainer}>
      <section css={categorySection}>
        <Category />
      </section>
      <section css={listSection}>
        <ListComponent data={list} page={page} />
      </section>
      <section css={tagSection}>
        <TagComponent tags={tags} selectedTag={selectedTag || ''} />
      </section>
    </div>
  </div>
);

export default Tag;
