import axios from 'axios';
import type { NextPage } from 'next';

import Category from '../../components/Category';
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

interface Props {
  category: 'audio' | 'video';
  tags: string[];
}

export async function getServerSideProps(context: {
  params: { category: string };
}) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/tag`);
  const { data } = res.data;

  return {
    props: {
      tags: data,
      category: context.params.category,
    },
  };
}

const Home: NextPage<Props> = ({ category, tags }) => (
  <div css={container}>
    <Nav />
    <Search />
    <div css={mainContainer}>
      <section css={categorySection}>
        <Category category={category} />
      </section>
      <section css={listSection}></section>
      <section css={tagSection}>
        <TagComponent tags={tags} selectedTag={''} />
      </section>
    </div>
  </div>
);

export default Home;
