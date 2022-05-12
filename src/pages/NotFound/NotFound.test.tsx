import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouter } from '../../utils/testUtils';

it('navigates to Not Found page when page is not found', async () => {
  renderWithRouter(<App />, {
    route: '/some-non-existing-page',
  });

  expect(
    await screen.findByRole('heading', { name: /page not found/i })
  ).toBeInTheDocument();
});

it('navigates back to home page when `Take me home` button is pressed', async () => {
  const { user } = renderWithRouter(<App />, {
    route: '/some-non-existing-page',
  });

  const button = await screen.findByRole('button', { name: /take me home/i });

  user.click(button);

  const searchBox = await screen.findByRole('searchbox', {
    name: /search/i,
  });

  expect(searchBox).toBeInTheDocument();
  expect(window.location.pathname).toBe('/animes');
});
