import React, { useEffect, useState } from 'react';
import './App.css';
import QuestionCard from './QuestionCard/QuestionCard';
import { Difficulty, QuestionState, fetchQuizQuestions } from './API';
import { toBeRequired } from '@testing-library/jest-dom/matchers';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
  
}

const TOTAL_QUESTIONS = 20

function App() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('')

  const changeHandler = (event:string) => {
    setInput(event)
  }

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS ,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setUserAnswers([]);
    setMessage('')
    setNumber(0);
    setLoading(false);
};
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(message) {
      return
    }
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
    }
      setUserAnswers(prev => [...prev, answerObject])
      const correctAnswer:string = questions[number].correct_answer
    if(correctAnswer?.toLowerCase() === input.toLocaleLowerCase()) {

      setMessage('Good!Your answer is correct');
    }else {
    
      setMessage('Oops! Your answer is incorrect');
    }
    }
    setTimeout(() => {
      startTrivia()
      setMessage('')
    }, 5000);
    setInput("") 
  };

  const nextQuestion = () => {
    startTrivia()
    setMessage('')
  };
  return (
    <div className="App">
      <h1 className='neonText'>Trivia Game</h1>
        { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null }
        { !gameOver && loading && <p className='loading'>Loading Questions ...</p> }
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
        <div style={{marginLeft: '20px'}}>
        {!loading && !gameOver &&
        <>
        <br/>
         <div>
         <input type = "text" placeholder='Enter answer' className='input-text' value={input} onChange={(e)=>{
          changeHandler(e.target.value) 
        }}/>
         </div>
        <br/>
        <div>
        <button disabled ={!input || message ? true : false} className='btn-submit' style={{cursor: 'pointer' ,backgroundColor: 'rgb(218 227 235)', gap:'10px', textAlign:'center'
        }} type='button' onClick={checkAnswer}>submit</button>
        </div>
        </>
        }
        </div>
        <div style={{
              backgroundColor: message  ? 'lightblue' : 'white',
              cursor: 'pointer', marginLeft: '20px', width: '50%'
            }}> {message}</div>
            <br/>
        { 
        !gameOver && 
        !loading && 
        userAnswers.length === number + 1 && 
        number !== TOTAL_QUESTIONS - 1 ? (
          <button style={{backgroundColor: 'hsl(260deg 7.02% 74.31%)', cursor: 'pointer', marginLeft: '20px', maxWidth: '100px', minWidth: '40px'}} onClick={nextQuestion}>
          Next Question
          </button>
        ) : null}
        
    </div>
  );
}

export default App;

