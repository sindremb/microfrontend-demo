import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App basePath={'/games'} />);
  const linkElement = screen.getByText(/Games/i);
  expect(linkElement).toBeInTheDocument();
});
