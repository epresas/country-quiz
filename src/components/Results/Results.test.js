import { render, screen } from '@testing-library/react';
import Results from './Results';

describe('Results component renders correctly', () => {
  beforeEach(() => {
    render(<Results score={4}/>)
  });

  test('should render title', () => {
    const title = screen.getByText('Results');
    expect(title).toBeInTheDocument();
  });
  
  test('should display  results', () => {
    const result = screen.getByText(/[0-9]/);
    expect(result).toBeInTheDocument();
  });
  
  test('should render "try again" button', () => {
    const button = screen.getByText(/try again/i);
    expect(button).toBeInTheDocument();
  });  
})
