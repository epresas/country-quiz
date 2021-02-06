import React, { useState, useEffect , useCallback } from 'react'

import styles from './Quiz.module.css';
import Answers from '../../components/Answers/Answers';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Results from '../../components/Results/Results';

const Quiz = (params) => {
  const BASE_API = 'https://restcountries.eu/rest/v2/';
  const NUMBER_OF_QUESTIONS = 4;
  const NUMBER_OF_ANSWERS = 4;
  const [score, setScore] = useState(0);
  const [finishedQuiz, setfinishedQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);

  const getCountries = async () => {
    const response = await fetch(`${BASE_API}regionalbloc/eu?fields=name;capital;flag;`);

    if (!response.ok) {
      console.log(response.text, response.status)
    }
    const countryData = await response.json();
    return countryData;

  }
    
  const getCorrectAnswer = useCallback((countryData) => {
    const answer = getRandomCountry(countryData);
    
    return answer;
  }, []);
  
  const sortAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5).map((answer, i) => ({
      id: String.fromCharCode(65 + i),
      value: answer.value,
      isCorrect: null,
    }));
  };

  const getCapitalAnswers = useCallback((countryToGuess, countryData) => {
    const answers = [{
      value: countryToGuess.capital,
    }];

    while (answers.length < NUMBER_OF_ANSWERS) {
      const city =  getRandomCountry(countryData).capital;

      if (!Object.values(answers).find( answer => answer.value === city)) {
        answers.push({
          value: city,
        })
      }
    }

    return answers;
  }, []);

  const getFlagAnswers = useCallback((countryToGuess, countryData) => {
    const answers = [{
      value: countryToGuess.name,
    }];

    while (answers.length < NUMBER_OF_ANSWERS) {
      const country = getRandomCountry(countryData).name;

      if (!Object.values(answers).find( answer => answer.value === country)) {
        answers.push({
          value: country,
        })
      }
    }

    return answers;
  }, []);

  const getQuestion = useCallback(
    async () => {
      const countryData = await getCountries();
      const countryToGuess = getCorrectAnswer(countryData);
      const mode = Math.random() < 0.5 ? 'capital' : 'flag';
      const answers = mode === 'capital' 
        ? getCapitalAnswers(countryToGuess, countryData)
        : getFlagAnswers(countryToGuess, countryData);
      const sortedAnswerArray = sortAnswers(answers); 
      const question = {
        countryToGuess,
        answers: sortedAnswerArray,
        type: mode,
        isAnswered: false,
        correct: null,
        incorrect: null,
      };
  
      return question;
    },
    [getCapitalAnswers, getCorrectAnswer, getFlagAnswers],
  )
  
  useEffect(() => {
    // reference: https://www.robinwieruch.de/react-hooks-fetch-data
    if (!finishedQuiz) {
      const getQuestions = async (numberOfQuestions) => {
        const questionsArray = [];
        let idx = 0;
  
        while (idx < numberOfQuestions) {
          questionsArray.push(getQuestion());
          idx++;
        }
  
        Promise.all(questionsArray)
          .then( questions => {
            setQuestions(questions);
          })
      };
      getQuestions(NUMBER_OF_QUESTIONS);   
    }
  }, [finishedQuiz, getQuestion]);

  const getRandomCountry = (countries = []) => {
    const max = countries.length;
    const index = Math.floor(Math.random() * max)
    return (countries[index]);
  }

  const checkAnswer = (selectedAnswer) => {
    const idx = currentQuestionIndex;
    const updatedQuestions = [...questions];
    const updatedQuestion = updatedQuestions[idx];
    const mode = questions[idx].type
    let isCorrect = false;

    if (mode === 'capital') {
      isCorrect = selectedAnswer.value === questions[idx].countryToGuess.capital;
    } else {
      isCorrect = selectedAnswer.value === questions[idx].countryToGuess.name;  
    }

    updatedQuestion.isAnswered = true;
    updatedQuestion.isCorrect = isCorrect;
    updatedQuestion.answers.forEach( answer => {
      if (mode === 'capital') {
        answer.correct = answer.value === questions[idx].countryToGuess.capital;
      } else {
        answer.correct = answer.value === questions[idx].countryToGuess.name;
      }

      answer.incorrect = answer.id === selectedAnswer.id && !answer.correct;
    });
    updatedQuestions[idx] = updatedQuestion;

    setQuestions(updatedQuestions);

  };

  const onNextButtonClicked = () => {
    const idx = currentQuestionIndex;
    if (idx >= questions.length - 1) {
      getTotalScore();
    } else {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getTotalScore = () => {
    let totalScore = questions.reduce( (totalScore, question) => totalScore + question.isCorrect, 0);
    setScore(totalScore);
    setfinishedQuiz(true);
  };

  const restartQuiz = () => {
    setfinishedQuiz(false);
    setcurrentQuestionIndex(0);
    setScore(0);
  }
  
  let quiz = <Spinner/>;
  if (!finishedQuiz && questions[currentQuestionIndex]) {
    let nextButton = null;
    if (questions[currentQuestionIndex].isAnswered) {
      if(currentQuestionIndex >= questions.length - 1) {
        nextButton = <Button 
          label="Get Results" 
          clicked={onNextButtonClicked} 
        />
      } else {
        nextButton = <Button 
          label="Next" 
          clicked={onNextButtonClicked} 
        />
      }

    }
    
    let question = <div className={styles.Question}>What's the capital of {questions[currentQuestionIndex].countryToGuess.name}?</div>;

    if (questions[currentQuestionIndex].type === 'flag') {
      question = <div className={styles.QuestionWrapper}>
        <img className={styles.Flag} alt='' src={questions[currentQuestionIndex].countryToGuess.flag} />
        <div className={styles.Question}>Which country does this flag belong to?</div>
      </div>
    }
    quiz = (<div> 
      {question}
      <Answers 
        answers={questions[currentQuestionIndex]}
        onAnswerClicked={checkAnswer}
      /> 
      <footer className={styles.Footer}>
        {nextButton}
      </footer> 
    </div>);
  
  }

  if (finishedQuiz) {
    quiz = <Results
      score={score}
      retryClicked={restartQuiz}
    ></Results>
  }

  return(
    <section className={styles.Wrapper}>
      <header>
        <h2 className={styles.Header}>Country quiz</h2>
        {!finishedQuiz && <div className={styles.Logo}></div>}
      </header>
      <div className={styles.Quiz}>
        {quiz}
      </div>
    </section>
  );
}

export default Quiz;
