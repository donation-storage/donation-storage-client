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
  selectedTag: string;
  tags: string[];
}

export async function getServerSideProps(context: { params: { tag: string } }) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/tag`);
  const { data } = res.data;

  return {
    props: {
      tags: data,
      selectedTag: context.params.tag,
    },
  };
}

const Tag: NextPage<Props> = ({ selectedTag, tags }) => (
  <>
    <Nav />
    <Search />
    <div css={mainContainer}>
      <section css={categorySection}></section>
      <section css={listSection}></section>
      <section css={tagSection}>
        <TagComponent tags={tags} selectedTag={selectedTag} />
      </section>
    </div>
  </>
);

export default Tag;
