import { rest } from 'msw';
import { faker } from '@faker-js/faker';

export const handlers = [
  rest.get('https://api.jikan.moe/v4/anime/:animeID', (req, res, ctx) => {
    const { animeID } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          mal_id: animeID,
          members: faker.datatype.number(),
          popularity: faker.datatype.number(),
          rank: faker.datatype.number(),
          score: faker.datatype.number({ min: 0, max: 10, precision: 0.01 }),
          scored_by: faker.datatype.number(),
          title: 'Naruto',
        },
      })
    );
  }),
  rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
    const q = req.url.searchParams.get('q');
    const page = req.url.searchParams.get('page');
    const limit = req.url.searchParams.get('limit');
    return res(
      ctx.status(200),
      ctx.json({
        data: [...Array(parseInt(limit || '0', 10))].map((_, index) => ({
          images: {
            jpg: {
              image_url: faker.image.imageUrl(),
            },
          },
          mal_id: index + 20,
          members: faker.datatype.number(),
          popularity: faker.datatype.number(),
          rank: faker.datatype.number(),
          score: faker.datatype.number({ min: 0, max: 10, precision: 0.01 }),
          scored_by: faker.datatype.number(),
          title: q || `Naruto-${page}`,
        })),
        pagination: {
          last_visible_page: faker.datatype.number({ min: 2 }),
          items: { count: parseInt(limit || '0', 10) },
        },
      })
    );
  }),
];
