import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/' } = {}
) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user,
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
