import { AnswerObject } from "../App";
import './QuestionCard.css';
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
      <div className="container">
        <div className="question" dangerouslySetInnerHTML={{ __html: question }} />
          <label className="label">Options:
        <div className="option">
          {option.map((answer) => (
            <div  key={answer}>
              <button  className ='btn-option' style={{
              cursor: 'pointer', backgroundColor: 'hsla(0,0%,100%,1)',border: 'solid 1px black',borderRadius: '2px', width: 'auto' ,fontFamily: 'bold',height: 'auto'
            }}
                disabled={userAnswer ? true : false}
                onClick={()=> {
                    handleChange(answer);
                   
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          ))}
        </div>
          </label>
        <div>
        </div>
      </div>
    );
}
export default QuestionCard