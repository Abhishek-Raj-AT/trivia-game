import { AnswerObject } from "../App";
import './QuestionCard.css'
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
      <div style ={{display: 'flex',
        flexWrap: 'wrap'}}>
        <span className="question" dangerouslySetInnerHTML={{ __html: question }} />
          <label className="label" />
        <div className="options">
          {option.map((answer) => (
            <div  key={answer} >
              <button  className ='button' 
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
        <div>
        </div>
      </div>
    );
}
export default QuestionCard