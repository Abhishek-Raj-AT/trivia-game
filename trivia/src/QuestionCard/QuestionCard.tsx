import { AnswerObject } from "../App";

interface props {
    question: string;
    option: string[];
    handleSubmit:(e: React.MouseEvent<HTMLButtonElement>) => void;
    handleChange:(e: React.InputHTMLAttributes<HTMLInputElement>) => void;
    questionNumber: number;
    totalQuestions: number;
    userAnswer: AnswerObject | undefined;
}
const QuestionCard: React.FC<props> = ({question, option, handleSubmit, userAnswer,handleChange , totalQuestions,}) =>{
    return(
        <div>
            <h2>{question}</h2>
            <div>
            {option.map(answer => (
          <div className='buttonWrapper' 
            key={answer}
            >
              <button disabled={userAnswer ? true : false} value={answer} onClick={handleSubmit}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
          </div>
        ))}
            </div>
            <div>
                <input type="text" name="answer"  onChange={handleChange}/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
export default QuestionCard