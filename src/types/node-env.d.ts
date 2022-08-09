/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_USE_API_MOCKING: string | undefined;
    NEXT_PUBLIC_SERVER_API: string | undefined;
    NEXT_PUBLIC_CLINET_DOMAIN: string | undefined;
    NEXT_PUBLIC_CLINET_ORIGIN: string | undefined;
  }
}
