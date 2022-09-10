import axios from 'axios';

import { getOnePostApi } from '../../apis/post';
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
import type { PostConfig } from '../../types/api';

interface Props {
  tags: string[];
  data: PostConfig;
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const tagResponse = await axios.get('http://msw.mock/tag');

  const viewResponse = await getOnePostApi(context.params.id);

  return {
    props: {
      tags: tagResponse.data.data,
      data: viewResponse?.data,
    },
  };
}

const View = ({ data, tags }: Props) => (
  <div css={container}>
    <Nav tags={tags} selectedTag={''} />
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
