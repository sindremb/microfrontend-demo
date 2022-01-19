import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App basePath={'/pets'} />);
  const linkElement = screen.getByText(/Pets app/i);
  expect(linkElement).toBeInTheDocument();
});
