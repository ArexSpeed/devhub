import data from 'data/quiz.json';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import Link from 'next/link';

const Quizes = () => {
  //console.log(data);
  return (
    <div className="quiz__all-quizes">
      <div className="quiz__all-quizes--title">
        <span>Quizes</span>
      </div>
      <div className="quiz__all-quizes--quizes">
        {data.map((quiz) => (
          <div key={quiz.quizid} className={`quiz__all-quizes--card ${quiz.level.toLowerCase()}`}>
            <SkillsIconSwitcher
              name={quiz.quizname.toLowerCase()}
              className="icon-large primary-blue"
            />

            <div className="quiz__all-quizes--card--name-level">
              <span>{quiz.quizname}</span>
              <span>{quiz.level}</span>
            </div>

            <span>{quiz.questions.length} questions</span>

            <Link href={`/quiz/${quiz.quizid}`} passHref>
              <a>Start</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizes;
