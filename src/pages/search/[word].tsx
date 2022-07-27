import axios from 'axios';
import type { NextPage } from 'next';

import Nav from '../../components/Nav';
import TagComponent from '../../components/TagComponent';
import Search from '../../items/Search';
import {
  categorySection,
  listSection,
  mainContainer,
  tagSection,
} from '../../styles/common';

interface Props {
  word: string;
  tags: string[];
}

export async function getServerSideProps(context: {
  params: { word: string };
}) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/tag`);
  const { data } = res.data;

  return {
    props: {
      tags: data,
      word: context.params.word,
    },
  };
}

const Home: NextPage<Props> = ({ word, tags }) => (
  <>
    <Nav />
    <Search searchWord={word} />
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
