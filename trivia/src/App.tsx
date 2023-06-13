import React, { useCallback, useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
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
  const [clicked, setClicked] = useState(true);
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('')
  
const fetchQestion = useCallback(async  () => {

  if(questions?.length === 0) {
    console.log('run');
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS ,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
  } 
  setLoading(false);
}, [questions])
  useEffect(()=>{
    fetchQestion()
  },[fetchQestion])

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
console.log(questions);
console.log(userAnswers);

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
      setClicked(true)
      setMessage('Good!Your answer is correct');
    }else {
      setClicked(false)
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
    <div>   
    <MDBCard style={{width: '40%',
    margin: 'auto',
    height: '30%',
    marginTop: '30px',
    maxHeight: '120vh'
    }}>
    <MDBCardBody style={{textAlign: 'center'}}>
      <MDBCardText >
        {/* <MDBCardTitle style={{textAlign: 'center',
    }}>Trivia Game</MDBCardTitle> */}
        {/* { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <MDBBtn className="btn btn-primary" onClick={startTrivia}>Start</MDBBtn>
        ) : null } */}
        {  loading && <p className='spinner' ><i className='fas fa-circle-notch' style={{fontSize:'48px',color:'blue',}}></i></p> }
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
         <div className='input' style={{marginLeft: '0px'}} >
         <input type = "text" className="form-control" placeholder='Enter Answer' value={input} onChange={(e)=>{
          changeHandler(e.target.value) 
        }}/>
         </div>
        <br/>
        <span  className='btn-sub-next'>
        <div >
        <button disabled ={!input || message ? true : false} className='btn-submit' style={{cursor: 'pointer' ,backgroundColor: '#0d6efd', gap:'10px',color: 'white', borderRadius: '5px'
        }} type='button' onClick={checkAnswer}>submit</button>
        </div>
        { 
        userAnswers.length === number + 1 && 
        number !== TOTAL_QUESTIONS - 1 ? (
          <MDBBtn style={{backgroundColor: '#ffc107'}} onClick={nextQuestion}>
          Next Question
          </MDBBtn>
        ) : null}
        </span>
        </>
        }
        </div>
            <br/>
         
      </MDBCardText>
    </MDBCardBody>
            <div style={{ width: '95%', marginLeft: '20px', marginBottom: '20px'}}>
            {!loading && !gameOver && userAnswers.length === number + 1 && 
        number !== TOTAL_QUESTIONS - 1 &&<div>{clicked ? <div className="alert alert-primary" role="alert" >{message}</div>:<div className="alert alert-danger" role="alert">{message}</div>}</div>}
            </div>
  </MDBCard>
  </div>
  );
}

export default App;

