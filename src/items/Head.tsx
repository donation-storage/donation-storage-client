import NextHead from 'next/head';

const Head = () => (
  <NextHead>
    <meta
      key="viewport"
      name="viewport"
      content="initial-scale=1.0, width=device-width"
    />
    <meta key="charset" charSet="UTF-8" />
    <title>도네저장소</title>
    <meta name="description" content="내가 찾던 모든 도네이션!" />
    <link rel="shortcut icon" href="/donation-storage.ico" />
    <script
      defer
      src="https://developers.kakao.com/sdk/js/kakao.min.js"
    ></script>
  </NextHead>
);

export default Head;
