import React, { useState, useEffect , useCallback } from 'react'

import classes from './Quiz.module.css';
import Answers from '../../components/Answers/Answers';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

const Quiz = (params) => {
  const BASE_API = 'https://restcountries.eu/rest/v2/';
  const NUMBER_OF_QUESTIONS = 4;
  const NUMBER_OF_ANSWERS = 4;

  //  TODO: implementar check de score, y set de numero de preguntas/respuestas
  // const [score, setScore] = useState(0);
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
  
  const getQuestion = useCallback(
    async (numberOfAnswers) => {
      const countryData = await getCountries();
      const countryToGuess = getCorrectAnswer(countryData);
      const correctAnswer = countryToGuess.capital;
      const answers = [{
        value: correctAnswer,
      }];
  
      while (answers.length < numberOfAnswers) {
        const city =  getRandomCountry(countryData).capital;
        debugger;
        if (!Object.values(answers).find( answer => answer.value === city)) {
          answers.push({
            value: getRandomCountry(countryData).capital,
          })
        }
      }
  
      const sortedAnswerArray = answers.sort(() => Math.random() - 0.5).map((answer, i) => ({
        id: String.fromCharCode(65 + i),
        value: answer.value,
        isCorrect: null,
      }));
  
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
    getQuestions(NUMBER_OF_QUESTIONS)
  }, [getQuestion]);

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
  
  let quiz = <Spinner/>;
  if (questions[currentQuestionIndex]) {
    let nextButton = null;
    if (questions[currentQuestionIndex].isAnswered) {
      nextButton = <Button 
      label="Next" 
      clicked={() => setcurrentQuestionIndex(currentQuestionIndex + 1)} 
    />
    }
    quiz = (<> 
      <div className={classes.Question}>What's the capital of {questions[currentQuestionIndex].countryToGuess.name}?</div>
      <Answers 
        answers={questions[currentQuestionIndex]}
        onAnswerClicked={checkAnswer}
      /> 
      <footer className={classes.Footer}>
        {nextButton}
      </footer> 
    </>);
  
  }

  return(
    <section className={classes.Wrapper}>
      <header>
        <h2 className={classes.Header}>Country quiz</h2>
        <div className={classes.Logo}></div>
      </header>
      <div className={classes.Quiz}>
        {quiz}
      </div>
    </section>
  );
}

export default Quiz;
