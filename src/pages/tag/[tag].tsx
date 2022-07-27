import axios from 'axios';
import type { NextPage } from 'next';

import Nav from '../../components/Nav';
import TagComponent from '../../components/TagComponent';

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
    <TagComponent selectedTag={selectedTag} tags={tags} />
  </>
);

export default Tag;
