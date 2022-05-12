import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import App from '../../App';
import { renderWithRouter } from '../../utils/testUtils';
import { mockServer } from '../../__mock__/server';
import { ITEMS_PER_PAGE } from '../../constants';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

jest.setTimeout(300000);

it('renders mock anime list', async () => {
  renderWithRouter(<App />, {
    route: '/',
  });

  const items = await screen.findAllByRole('button', { name: /naruto/i });
  expect(items).toHaveLength(ITEMS_PER_PAGE);
});

it('renders correct anime list based on search input', async () => {
  const { user } = renderWithRouter(<App />, {
    route: '/',
  });

  const searchInput = faker.random.word();

  const searchBox = await screen.findByRole('searchbox', { name: /search/i });
  user.type(searchBox, `${searchInput}{enter}`);

  const items = await screen.findAllByRole('button', {
    name: new RegExp(searchInput),
  });
  expect(items).toHaveLength(ITEMS_PER_PAGE);
});

it('navigates to Anime Detail page when card is clicked', async () => {
  const { user } = renderWithRouter(<App />, {
    route: '/',
  });

  const [card] = await screen.findAllByRole('button', {
    name: /naruto\W[0-9]/i,
  });
  user.click(card);

  const title = await screen.findByRole('heading', { name: /naruto/i });
  expect(title).toBeInTheDocument();
  expect(window.location.pathname).toBe('/animes/detail/20');
});

it('navigates to the next/previous page when next/previous page button is clicked', async () => {
  const { user } = renderWithRouter(<App />, {
    route: '/',
  });

  const nextPageButton = await screen.findByRole('button', {
    name: /Go to next page/i,
  });
  expect(nextPageButton).toBeInTheDocument();
  user.click(nextPageButton);

  let nextPageItems = await screen.findAllByRole('button', {
    name: /naruto-2/i,
  });
  expect(nextPageItems).toHaveLength(12);
  let previousPageItems = screen.queryAllByRole('button', {
    name: /naruto-1/i,
  });
  expect(previousPageItems).toHaveLength(0);

  let firstPageButton = await screen.findByRole('button', {
    name: 'Go to page 1',
  });
  let secondPageButton = await screen.findByRole('button', {
    name: 'page 2',
  });
  expect(firstPageButton).not.toHaveStyle(
    'background-color: rgba(0, 0, 0, 0.08)'
  );
  expect(secondPageButton).toHaveStyle('background-color: rgba(0, 0, 0, 0.08)');

  const previousPageButton = await screen.findByRole('button', {
    name: /Go to previous page/i,
  });
  expect(previousPageButton).toBeInTheDocument();
  user.click(previousPageButton);

  nextPageItems = screen.queryAllByRole('button', {
    name: /naruto-2/i,
  });
  previousPageItems = await screen.findAllByRole('button', {
    name: /naruto-1/i,
  });
  expect(nextPageItems).toHaveLength(0);
  expect(previousPageItems).toHaveLength(12);

  firstPageButton = await screen.findByRole('button', {
    name: 'page 1',
  });
  secondPageButton = await screen.findByRole('button', {
    name: 'Go to page 2',
  });
  expect(firstPageButton).toHaveStyle('background-color: rgba(0, 0, 0, 0.08)');
  expect(secondPageButton).not.toHaveStyle(
    'background-color: rgba(0, 0, 0, 0.08)'
  );
});

it('renders No Results Found! when response data is empty', async () => {
  mockServer.use(
    rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [],
          pagination: {
            items: { count: 0 },
          },
        })
      );
    })
  );

  const { user } = renderWithRouter(<App />, {
    route: '/',
  });

  const searchBox = await screen.findByRole('searchbox', { name: /search/i });
  user.type(searchBox, `${faker.random.word()}{enter}`);

  const title = await screen.findByRole('heading', {
    name: /no results found/i,
  });

  expect(title).toBeInTheDocument();
});
