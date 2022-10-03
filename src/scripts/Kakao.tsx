export const kakaoInit = () => {
  const { Kakao } = window;

  if (!Kakao.isInitialized()) {
    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }
};
