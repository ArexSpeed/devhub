import { useState } from 'react';

const Questions = ({ question }) => {
  const [answerChecked, setAnswerChecked] = useState();

  console.log(question);
  return (
    <div className="quizPage__questions">
      <div key={question.questionid} className="quizPage__questions--question">
        <span>Question {question.questionid}.</span>
        <span>{question.question}</span>
      </div>
      <div className="quizPage__questions--answers">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            className={`quizPage__questions--answer ${answerChecked === i && 'active'}`}
            onClick={() => setAnswerChecked(i)}>
            <span>{answer.content}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
