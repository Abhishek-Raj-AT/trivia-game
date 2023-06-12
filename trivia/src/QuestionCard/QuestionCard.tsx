import { AnswerObject } from "../App";
import './QuestionCard.css'
import {
  MDBBtn
} from 'mdb-react-ui-kit';
interface props {
    question: string;
    option: string[];
    handleSubmit:(e: React.MouseEvent<HTMLButtonElement>) => void;
    handleChange:(value: string) => void;
    questionNumber: number;
    totalQuestions: number;
    userAnswer: AnswerObject | string;
}
const QuestionCard: React.FC<props> = ({question, option, handleSubmit, userAnswer,handleChange , totalQuestions,}) =>{
    return (
      <div>
        <div className="question" dangerouslySetInnerHTML={{ __html: question }} />
          <label className="label"/>
        <div className="option">
          {option.map((answer) => (
            <div  key={answer} style={{ height: "40px", width:'auto'}}>
              <MDBBtn  className ='btn-option' style={{
              cursor: 'pointer',backgroundColor: "#faebd7", color:"black" 
            }}
                disabled={userAnswer ? true : false}
                onClick={()=> {
                    handleChange(answer);
                   
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </MDBBtn>
            </div>
          ))}
        </div>
        <div>
        </div>
      </div>
    );
}
export default QuestionCard