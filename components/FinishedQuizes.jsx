import data from 'data/quizScore.json';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';

const FinishedQuizes = () => {
  //console.log(data);
  return (
    <div className="quiz__finished-quizes">
      <div className="quiz__finished-quizes--title">
        <span>Finished quizes</span>
      </div>
      <div className="quiz__finished-quizes--results">
        {data.map((result) => (
          <div
            key={result.scoreid}
            className={`quiz__finished-quizes--card ${result.quizlevel.toLowerCase()} `}>
            <SkillsIconSwitcher
              name={result.quizname.toLowerCase()}
              className="icon-large primary-blue"
            />

            <div className="quiz__finished-quizes--card--name-level">
              <span>{result.quizname}</span>
              <span>{result.quizlevel}</span>
            </div>

            <div className="quizScore">
              <CircularProgressbar
                strokeWidth={10}
                value={result.score}
                text={`${result.score}%`}
                styles={{
                  text: {
                    fill: '#000',
                    fontSize: '27px'
                  },
                  path: {
                    stroke: '#0072AF'
                  }
                }}
              />
            </div>
            <Link href={`/quiz/${result.quizid}`} passHref>
              <a>Repeat</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishedQuizes;
