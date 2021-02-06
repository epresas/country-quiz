import { render, screen } from '@testing-library/react'
import Answer from './Answer';
import * as mock from '../Answers.mock';


describe('Rendering answer component', () => {
  beforeEach(() => {
    render(
      <div>
        {mock.individualAnswers.map(answer => <Answer 
        key={answer.id} 
        id={answer.id} 
        label={answer.value}
        answered = {true}
        correct={answer.correct}
        incorrect={answer.incorrect}
        clicked={() => {}}
      />)}
      </div> 
    );

  })
  test('should correct answer have Correct class', () => {
    const { getAllByRole } = screen;

    expect(getAllByRole('button')[0]).toHaveClass('Correct');
  })

  test('should incorrect answer have Incorrect class', () => {
    const { getAllByRole } = screen;

    expect(getAllByRole('button')[1]).toHaveClass('Incorrect');
  })
  
  test('should other answers have Disabled class', () => {
    const { getAllByRole } = screen;

    expect(getAllByRole('button')[2]).toHaveClass('Disabled');
  })
})
