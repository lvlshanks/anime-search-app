import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouter } from '../../utils/testUtils';
import '../../__mock__/matchmedia';
import { mockServer } from '../../__mock__/server';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

jest.setTimeout(300000);

it('renders mock anime detail', async () => {
  renderWithRouter(<App />, {
    route: '/animes/detail/20',
  });

  const title = await screen.findByRole('heading', { name: /naruto/i });
  expect(title).toBeInTheDocument();
});

// it('navigates back when `Back` button is pressed', async () => {
//   const { user } = renderWithRouter(<App />, {
//     route: '/animes',
//   });

//   const cardButton = await screen.findByRole('button', { name: /naruto/i });

//   user.click(cardButton);

//   const backButton = await screen.findByRole('button', { name: /back/i });

//   user.click(backButton);

//   expect(window.location.pathname).toBe('/animes');
// });
