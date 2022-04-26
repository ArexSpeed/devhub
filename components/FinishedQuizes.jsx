import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';

const FinishedQuizes = ({ level, scoreid, quizname, score, quizid }) => {
  return (
    <div key={scoreid} className={`quiz__finished-quizes--card ${level.toLowerCase()} `}>
      <SkillsIconSwitcher name={quizname.toLowerCase()} className="icon-large primary-blue" />

      <div className="quiz__finished-quizes--card--name-level">
        <span>{quizname}</span>
        <span>{level}</span>
      </div>

      <div className="quizScore">
        <CircularProgressbar strokeWidth={10} value={score * 10} text={`${score * 10}%`} />
      </div>
      <Link href={`/quiz/${quizid}`} passHref>
        <a>Repeat</a>
      </Link>
    </div>
  );
};

export default FinishedQuizes;
