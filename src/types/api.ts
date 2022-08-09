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
