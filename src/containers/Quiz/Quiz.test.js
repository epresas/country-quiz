import { render, screen } from '@testing-library/react';
import Quiz from './Quiz';

describe('Rendering Quiz component', () => {
  beforeEach(() => {
    render(<Quiz />);
  });
  test('renders quiz header', () => {
    const titleElement = screen.getByText(/country quiz/i);
    expect(titleElement).toBeInTheDocument();
  });
  
  test('renders quiz', () => {
    const quiz = document.querySelector('.Wrapper');
    expect(quiz).toBeInTheDocument();
  })
});