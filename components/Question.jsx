import { useState } from 'react';

const Question = ({ question, scores, setScores }) => {
  const [answerChecked, setAnswerChecked] = useState();

  // const [questionid, setQuestionid] = useState(question.questionid);

  const addScore = (answerid, correct) => {
    setAnswerChecked(answerid);
    const filteredScore = scores.filter((score) => score.questionid !== question.questionid);
    const clickedAnswer = { questionid: question.questionid, point: correct ? 1 : 0 };
    setScores([...filteredScore, clickedAnswer]);
  };

  //console.log(question);
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
            className={`quizPage__questions--answer ${answerChecked === answer.id && 'active'}`}
            onClick={() => addScore(answer.id, answer.correct, question.questionid)}>
            <span>{answer.content}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
