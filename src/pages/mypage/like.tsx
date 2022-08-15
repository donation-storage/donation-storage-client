import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';

import MyPageList from '../../components/MyPageList';
import MyPageSideBar from '../../components/MypageSideBar';
import MyPageSearch from '../../items/MyPageSearch';
import type { AudioConfig, VideoConfig } from '../../types/api';

interface Props {
  list: Array<AudioConfig | VideoConfig>;
}

export async function getServerSideProps() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_API}/mypage`,
  );

  return {
    props: {
      list: response.data.data,
    },
  };
}

const Like: NextPage<Props> = ({ list }) => {
  const [word, setWord] = useState('');
  const [data, setData] = useState<Array<AudioConfig | VideoConfig>>(list);
  const [page, setPage] = useState(1);

  return (
    <MyPageSideBar path="liked">
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
        title="좋아요한 글"
      />
    </MyPageSideBar>
  );
};

export default Like;
