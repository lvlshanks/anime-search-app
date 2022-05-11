import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.jikan.moe/v4/anime/:animeID', (req, res, ctx) => {
    const { animeID } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          mal_id: animeID,
          members: 2463505,
          popularity: 8,
          rank: 603,
          score: 7.97,
          scored_by: 1718762,
          title: 'Naruto',
        },
      })
    );
  }),
  rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            images: {
              jpg: {
                image_url:
                  'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
              },
            },
            mal_id: 20,
            members: 2463505,
            popularity: 8,
            rank: 603,
            score: 7.97,
            scored_by: 1718762,
            title: 'Naruto',
          },
        ],
        pagination: {
          items: { count: 1 },
        },
      })
    );
  }),
];
