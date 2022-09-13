import type { PostConfig } from './api';

export interface SelectOption {
  label: string;
  value: string;
}

export type CategoryConfig = 'all' | 'video' | 'audio';

export interface PageConfig {
  page: number;
  count: number;
}

export interface PageProps {
  tags: Array<{ tagName: string }>;
  list: PostConfig[];
  page: PageConfig;
  category?: 'audio' | 'video';
  word?: string;
  selectedTag?: string;
}

export interface MypageProps {
  list: PostConfig[];
  page: PageConfig;
  word?: string;
}
