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
        <h2>{question}</h2>
        <div className="option">
          {option.map((answer) => (
            <div className="buttonWrapper" key={answer}>
              <button
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