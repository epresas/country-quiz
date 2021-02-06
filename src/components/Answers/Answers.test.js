import { render, screen } from '@testing-library/react';
import Answers from './Answers';
import * as mock from './Answers.mock';

describe('Renders Answers component', () => {
  beforeEach(() => {
    render(<Answers answers={mock.answersMock}/>);
  });

  test('should render answers correctly', () => {
    const answerList = screen.getAllByRole('button');
    
    expect(answerList.length).toBe(4);
  });  
});

describe('Clicks answer', () => {
  beforeEach(() => {
    render(<Answers answers={mock.answersMock}/>);
  });

  test('should click on correct answer', () => {
    const mockClickAnswer = jest.fn(selectedAnswer => {
      const answer = mock.correctAnswer.name;
      const isCorrect = selectedAnswer.value === answer;
      
      return isCorrect;
    });
    const isCorrect = mockClickAnswer(mock.answersMock.answers[0]);

    expect(isCorrect).toBe(true);
  });

  test('should click on wrong answer', () => {
    const mockClickAnswer = jest.fn(selectedAnswer => {
      const answer = mock.correctAnswer.name;
      const isCorrect = selectedAnswer.value === answer;
      
      return isCorrect;
    });
    const isCorrect = mockClickAnswer(mock.answersMock.answers[1]);

    expect(isCorrect).toBe(false);
  });
  
})

