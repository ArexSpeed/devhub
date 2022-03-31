import data from 'data/quizScore.json';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FinishedQuizes = () => {
  console.log(data);
  return (
    <div className="quiz__finished-quizes">
      <div className="quiz__finished-quizes--title">
        <span>Finished quizes</span>
      </div>
      <div className="quiz__finished-quizes--results">
        {data.map((result) => (
          <div key={result.scoreid} className="quiz__finished-quizes--card">
            <SkillsIconSwitcher
              name={result.quizname.toLowerCase()}
              className="icon-large primary-blue"
            />
            <span>
              {result.quizname} - {result.quizlevel}
            </span>
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
            <button>Repeat</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishedQuizes;
