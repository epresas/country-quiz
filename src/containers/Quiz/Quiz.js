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

  //  TODO: implementar check de score, y set de numero de preguntas/respuestas
  const [score, setScore] = useState(0);
  const [finishedQuiz, setfinishedQuiz] = useState(false);
  // const [questionsNumber, setquestionsNumber] = useState(0);
  // const [answersNumber, setanswersNumber] = useState(0);
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

  const getQuestion = useCallback(
    async (numberOfAnswers, mode = 'capital') => {
      const countryData = await getCountries();
      const countryToGuess = getCorrectAnswer(countryData);
      const correctAnswer = countryToGuess.capital;
      const answers = [{
        value: correctAnswer,
      }];
  
      while (answers.length < numberOfAnswers) {
        const city =  getRandomCountry(countryData).capital;

        if (!Object.values(answers).find( answer => answer.value === city)) {
          answers.push({
            value: city,
          })
        }
      }
  
      const sortedAnswerArray = sortAnswers(answers);
  
      const question = {
        countryToGuess,
        answers: sortedAnswerArray,
        isAnswered: false,
        correct: null,
        incorrect: null,
      };
  
      return question;
    },
    [getCorrectAnswer],
  )
  
  useEffect(() => {
    // reference: https://www.robinwieruch.de/react-hooks-fetch-data
    if (!finishedQuiz) {
      const getQuestions = async (numberOfQuestions) => {
        const questionsArray = [];
        let idx = 0;
  
        while (idx < numberOfQuestions) {
          questionsArray.push(getQuestion(NUMBER_OF_ANSWERS));
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
    const isCorrect = selectedAnswer.value === questions[idx].countryToGuess.capital;

    updatedQuestion.isAnswered = true;
    updatedQuestion.isCorrect = isCorrect;
    updatedQuestion.answers.forEach( answer => {
      answer.correct = answer.value === questions[idx].countryToGuess.capital;
      answer.incorrect = answer.id === selectedAnswer.id && !answer.correct;
    });
    updatedQuestions[idx] = updatedQuestion;

    setQuestions(updatedQuestions);

    console.log(isCorrect);
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
    quiz = (<> 
      <div className={styles.Question}>What's the capital of {questions[currentQuestionIndex].countryToGuess.name}?</div>
      <Answers 
        answers={questions[currentQuestionIndex]}
        onAnswerClicked={checkAnswer}
      /> 
      <footer className={styles.Footer}>
        {nextButton}
      </footer> 
    </>);
  
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
