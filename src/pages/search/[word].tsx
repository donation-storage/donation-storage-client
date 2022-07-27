import type { NextPage } from 'next';

import Nav from '../../components/Nav';

interface Props {
  word: string;
}

export function getServerSideProps(context: { params: { word: string } }) {
  return {
    props: {
      word: context.params.word,
    },
  };
}

const Home: NextPage<Props> = ({ word }) => (
  <>
    <Nav searchWord={word} />
  </>
);

export default Home;
