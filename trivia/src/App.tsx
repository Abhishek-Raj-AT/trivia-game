import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import './App.css'
import QuestionCard from './QuestionCard/QuestionCard';
import { Difficulty, QuestionState, fetchQuizQuestions } from './API';

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
    
    <MDBCard style={{width: '40%',
    margin: 'auto',
    height: '30%',
    marginTop: '30px',
    maxHeight: '120vh'
    }}>
    <MDBCardBody style={{textAlign: 'center'}}>
      <MDBCardText >
        <MDBCardTitle style={{textAlign: 'center',
    }}>Trivia Game</MDBCardTitle>
        { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <MDBBtn className="btn btn-primary" onClick={startTrivia}>Start</MDBBtn>
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
        <span  className='btn-sub-next'>
        <div style={{marginLeft: '240px'}}>
        <button disabled ={!input || message ? true : false} className='btn-submit' style={{cursor: 'pointer' ,backgroundColor: 'rgb(218 227 235)', gap:'10px', textAlign:'center'
        }} type='button' onClick={checkAnswer}>submit</button>
        </div>
        { 
        userAnswers.length === number + 1 && 
        number !== TOTAL_QUESTIONS - 1 ? (
          <MDBBtn onClick={nextQuestion}>
          Next Question
          </MDBBtn>
        ) : null}
        </span>
        </>
        }
        </div>
            <br/>
         <div style={{
              backgroundColor: message  ? 'lightblue' : 'red',
              cursor: 'pointer', marginLeft: 'auto', marginRight: 'auto', width: '50%'
            }}> {message}</div>
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
  );
}

export default App;

