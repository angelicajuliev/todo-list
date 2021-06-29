import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/Agregar una tarea/i);
  expect(linkElement).toBeInTheDocument();

  const header = screen.getByRole('banner');
  expect(header).toBeInTheDocument();
});