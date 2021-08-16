<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 04ea47672e52bce68e048be418e9b30b10c5d667
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
