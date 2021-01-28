import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quiz header', () => {
  render(<App />);
  const titleElement = screen.getByText(/country quiz/i);
  expect(titleElement).toBeInTheDocument();
});
