import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import Link from 'next/link';

const Quizes = ({ level, quizName, questions, quizId }) => {
  return (
    <div className={`quiz__all-quizes--card ${level.toLowerCase()}`}>
      <SkillsIconSwitcher name={quizName.toLowerCase()} className="icon-large primary-blue" />

      <div className="quiz__all-quizes--card--name-level">
        <span>{quizName}</span>
        <span>{level}</span>
      </div>

      <span>{questions.length} questions</span>

      <Link href={`/quiz/${quizId}`} passHref>
        <a>Start</a>
      </Link>
    </div>
  );
};

export default Quizes;
