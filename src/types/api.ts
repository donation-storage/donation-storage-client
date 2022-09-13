export interface TagConfig {
  tagName: string;
}

export interface VideoConfig {
  id: number;
  type: 'video';
  postName: string;
  tags: TagConfig[];
  url: string;
  startTime: number;
  writer: string;
  createdAt: string;
  like: number;
}

export interface AudioConfig {
  id: number;
  type: 'audio';
  postName: string;
  tags: TagConfig[];
  file: string;
  writer: string;
  createdAt: string;
  like: number;
}

export const isAudioConfig = (
  config: AudioConfig | VideoConfig,
): config is AudioConfig => config.type === 'audio';

export interface UserAuth {
  userSeq: number;
  userName: string;
}

export interface PostRequestConfig {
  keyword?: string;
  tag?: string;
  type?: 'a' | 'v';
  userId?: number;
  start?: number;
  length?: number;
}

export interface PostConfig {
  postSeq: number;
  postName: string;
  link: string;
  type: string;
  like: number;
  insertTime: string;
  insertUserId: string;
  startTime?: string;
  tag: string[];
}

export interface CommonResponseConfig {
  code: number;
  message: string;
  data: unknown;
}

export interface PostResponseConfig extends CommonResponseConfig {
  data: {
    startPage: number;
    pages: number;
    data: PostConfig[];
    pageGroupCount: number;
    count: number;
    endPage: number;
  };
}

export interface ViewResponseConfig extends CommonResponseConfig {
  data: PostConfig;
}

export interface LikeCountResponseConfig extends CommonResponseConfig {
  data: { likeCount: number };
}

export interface LikePutResponseConfig {
  code: number;
  message: string;
}

export interface LikeCheckResponseConfig extends CommonResponseConfig {
  data: { like: boolean };
}

export interface PostResultConfig {
  ResultCode: number;
  ResultData: string;
}
