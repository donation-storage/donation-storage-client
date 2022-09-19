import type { GetServerSideProps, NextPage } from 'next';

import { getServerSidePropsForLike } from '../../apis/ssr';
import { getUserInfoForSSR } from '../../apis/user';
import MyPageList from '../../components/MyPageList';
import MyPageSideBar from '../../components/MypageSideBar';
import MyPageSearch from '../../items/MyPageSearch';
import type { MypageProps } from '../../types/common';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookie = context.req.headers.cookie;
    const userData = await getUserInfoForSSR(cookie!);
    const start = Number(context.query.page) || 1;
    const keyword = (context.query.search as string) || '';
    const pageData = await getServerSidePropsForLike({
      start,
      userSeq: String(userData.userSeq),
    });

    return { props: { ...pageData.props, word: keyword } };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }
};

const Like: NextPage<MypageProps> = ({ list, page, word }: MypageProps) => (
  <MyPageSideBar path="liked">
    <MyPageSearch word={word} />
    <MyPageList page={page} data={list} nickname="닉네임" title="좋아요한 글" />
  </MyPageSideBar>
);

export default Like;
