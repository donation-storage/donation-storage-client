import { useState } from 'react';

import MyPageSideBar from '../../components/MypageSideBar';
import MyPageSearch from '../../items/MyPageSearch';
import type { AudioConfig, VideoConfig } from '../../types/api';

const Post = () => {
  const [word, setWord] = useState('');
  const [data, setData] = useState<Array<AudioConfig | VideoConfig>>([]);
  const [page, setPage] = useState(1);

  return (
    <MyPageSideBar path="posted">
      <MyPageSearch
        word={word}
        setWord={setWord}
        setData={setData}
        setPage={setPage}
      />
    </MyPageSideBar>
  );
};

export default Post;
