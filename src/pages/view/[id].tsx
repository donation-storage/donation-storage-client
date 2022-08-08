import axios from 'axios';

import Category from '../../components/Category';
import Nav from '../../components/Nav';
import TagComponent from '../../components/TagComponent';
import ViewComponent from '../../components/ViewComponent';
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
  tags: string[];
  data: VideoConfig | AudioConfig;
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const endpoints = [
    `${process.env.NEXT_PUBLIC_SERVER_API}/tag`,
    `${process.env.NEXT_PUBLIC_SERVER_API}/post/${context.params.id}`,
  ];
  const [tagResponse, viewResponse] = await axios.all(
    endpoints.map((endpoint) => axios.get(endpoint)),
  );

  return {
    props: {
      tags: tagResponse.data.data,
      data: viewResponse.data.data,
    },
  };
}

const View = ({ data, tags }: Props) => (
  <div css={container}>
    <Nav />
    <Search />
    <div css={mainContainer}>
      <section css={categorySection}>
        <Category />
      </section>
      <section css={listSection}>
        <ViewComponent data={data} />
      </section>
      <section css={tagSection}>
        <TagComponent tags={tags} selectedTag={''} />
      </section>
    </div>
  </div>
);

export default View;
