import { rest } from 'msw';

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
];
