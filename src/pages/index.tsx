import axios from 'axios';
import type { NextPage } from 'next';

import Nav from '../components/Nav';
import TagComponent from '../components/TagComponent';
import Search from '../items/Search';
import {
  categorySection,
  listSection,
  mainContainer,
  tagSection,
} from '../styles/common';

interface Props {
  selectedTag: string;
  tags: string[];
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/tag`);
  const { data } = res.data;

  return {
    props: {
      tags: data,
    },
  };
}

const Home: NextPage<Props> = ({ tags }) => (
  <>
    <Nav />
    <Search />
    <div css={mainContainer}>
      <section css={categorySection}></section>
      <section css={listSection}></section>
      <section css={tagSection}>
        <TagComponent tags={tags} selectedTag={''} />
      </section>
    </div>
  </>
);

export default Home;
