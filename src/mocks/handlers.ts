import { rest } from 'msw';

import type { AudioConfig, VideoConfig } from '../types/api';

const postList = [
  {
    id: 1,
    type: 'audio',
    postName: '음성도네 제목',
    tags: [{ tagName: '태그1' }, { tagName: '태그2' }],
    file: '/soundtracks/test.mp3',
    writer: '작성자',
    createdAt: '2020-01-01',
    like: 10,
  },
  {
    id: 2,
    type: 'video',
    postName: '영상도네 제목',
    tags: [{ tagName: '태그예시1' }, { tagName: '태그3' }],
    url: 'https://youtu.be/RWrucbFNKj4',
    startTime: 135,
    writer: '닉네임',
    createdAt: '2022-07-22',
    like: 0,
  },
  {
    id: 3,
    type: 'audio',
    postName: '음성도네 제목',
    tags: [{ tagName: '태그1' }, { tagName: '태그2' }],
    file: '/soundtracks/test.mp3',
    writer: '작성자',
    createdAt: '2020-01-01',
    like: 10,
  },
  {
    id: 4,
    type: 'video',
    postName: '영상도네 제목',
    tags: [{ tagName: '태그예시1' }, { tagName: '태그3' }],
    url: 'https://www.twitch.tv/videos/1555804371',
    startTime: 1350,
    writer: '닉네임',
    createdAt: '2022-07-22',
    like: 0,
  },
  {
    id: 5,
    type: 'audio',
    postName: '음성도네 제목',
    tags: [{ tagName: '태그1' }, { tagName: '태그2' }],
    file: '/soundtracks/test.mp3',
    writer: '작성자',
    createdAt: '2020-01-01',
    like: 10,
  },
  {
    id: 6,
    type: 'video',
    postName: '영상도네 제목',
    tags: [{ tagName: '태그예시1' }, { tagName: '태그3' }],
    url: 'https://youtu.be/RWrucbFNKj4',
    startTime: 135,
    writer: '닉네임',
    createdAt: '2022-07-22',
    like: 0,
  },
  {
    id: 7,
    type: 'audio',
    postName: '음성도네 제목',
    tags: [{ tagName: '태그1' }, { tagName: '태그2' }],
    file: '/soundtracks/test.mp3',
    writer: '작성자',
    createdAt: '2020-01-01',
    like: 10,
  },
  {
    id: 8,
    type: 'video',
    postName: '영상도네 제목',
    tags: [{ tagName: '태그예시1' }, { tagName: '태그3' }],
    url: 'https://www.twitch.tv/woowakgood/clip/SilkyPowerfulDragonLeeroyJenkins-Ck7C7bnQcXP-IUSH',
    startTime: 135,
    writer: '닉네임',
    createdAt: '2022-07-22',
    like: 0,
  },
  {
    id: 9,
    type: 'audio',
    postName: '음성도네 제목',
    tags: [{ tagName: '태그1' }, { tagName: '태그2' }],
    file: '/soundtracks/test.mp3',
    writer: '작성자',
    createdAt: '2020-01-01',
    like: 10,
  },
  {
    id: 10,
    type: 'video',
    postName: '영상도네 제목',
    tags: [{ tagName: '태그예시1' }, { tagName: '태그3' }],
    url: 'https://youtu.be/RWrucbFNKj4',
    startTime: 135,
    writer: '닉네임',
    createdAt: '2022-07-22',
    like: 0,
  },
];

export const handlers = [
  // 태그 조회
  rest.get('http://msw.mock/tag', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        data: ['태그1', '태그2', '태그3', '태그4', '태그예시1', '태그예시2'],
      }),
    ),
  ),
  rest.get<{ data: Array<AudioConfig | VideoConfig> }>(
    'http://msw.mock/list',
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          data: postList,
        }),
      ),
  ),
  rest.get<{ data: AudioConfig | VideoConfig }>(
    'http://msw.mock/post/:id',
    (req, res, ctx) => {
      const { id } = req.params;

      return res(
        ctx.status(200),
        ctx.json({
          data: postList.find((post) => post.id === Number(id)),
        }),
      );
    },
  ),
  rest.get<{ data: Array<AudioConfig | VideoConfig> }>(
    'http://msw.mock/mypage',
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          data: postList.slice(0, 5),
        }),
      ),
  ),
];
