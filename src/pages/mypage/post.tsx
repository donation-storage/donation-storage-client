import axios from 'axios';
import { useState } from 'react';

import MyPageList from '../../components/MyPageList';
import MyPageSideBar from '../../components/MypageSideBar';
import MyPageSearch from '../../items/MyPageSearch';
import type { AudioConfig, VideoConfig } from '../../types/api';

interface Props {
  list: Array<AudioConfig | VideoConfig>;
}

export async function getServerSideProps() {
  const response = await axios.get('http://msw.mock/mypage');

  return {
    props: {
      list: response.data.data,
    },
  };
}

const Post = ({ list }: Props) => {
  const [word, setWord] = useState('');
  const [data, setData] = useState<Array<AudioConfig | VideoConfig>>(list);
  const [page, setPage] = useState(1);

  return (
    <MyPageSideBar path="posted">
      <MyPageSearch
        word={word}
        setWord={setWord}
        setData={setData}
        setPage={setPage}
      />
      <MyPageList
        page={page}
        setPage={setPage}
        data={data}
        nickname="닉네임"
        title="작성한 글"
      />
    </MyPageSideBar>
  );
};

export default Post;
