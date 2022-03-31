import data from 'data/quiz.json';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';

const Quizes = () => {
  console.log(data);
  return (
    <div className="quiz__all-quizes">
      <div className="quiz__all-quizes--title">
        <span>Quizes</span>
      </div>
      <div className="quiz__all-quizes--quizes">
        {data.map((quiz) => (
          <div key={quiz.quizid} className="quiz__all-quizes--card">
            <SkillsIconSwitcher
              name={quiz.quizname.toLowerCase()}
              className="icon-large primary-blue"
            />
            <span>
              {quiz.quizname} - {quiz.level}
            </span>
            <span>{quiz.questions.length} questions</span>
            <button>Start</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizes;
