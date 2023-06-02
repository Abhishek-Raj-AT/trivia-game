import React, { useState } from 'react';
import './App.css';
import QuestionCard from './QuestionCard/QuestionCard';
import { Difficulty, QuestionState, fetchQuizQuestions } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [input, setInput] = useState('')

  const changeHandler = (event:string) => {
    console.log(event);
    setInput(event)

  }

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      console.log(correct);
      
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    } 
  };
 console.log([questions[number]])
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    setUserAnswers(prev =>
      [...prev, {
        question: questions[number].question,
        answer: input,
        correct: questions[number].correct_answer === input,
        correctAnswer: questions[number].correct_answer
      }]
    )
    setInput('')
  }
  
  return (
    <div className="App">
      <h1 className='neonText'>Trivia Game</h1>
        { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null }
        { loading && <p className='loading'>Loading Questions ...</p> }
        { !loading && !gameOver && (
          <QuestionCard 
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          userAnswer={userAnswers ? userAnswers[number] : 'Not Found'}
          handleSubmit={checkAnswer}
          handleChange={(event:string)=> changeHandler(event)}
          option={questions[number].answers}
           />
        )}
        <div className='input'>
        {!loading && !gameOver && <input type = "text" placeholder='select option' value={input} onChange={(e)=>{
          changeHandler(e.target.value)
        }}/>}
        </div>
        <div className='btn'>
        {!loading && !gameOver && <button  className='submit' onClick={handleSubmit}>submit</button>}
        </div>
        
        { 
        !gameOver && 
        !loading && 
        userAnswers.length === number + 1 && 
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
          Next Question
          </button>
        ) : null}
        
     
    </div>
  );
}

export default App;

