import { useRouter } from 'next/router';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Layout from 'components/Layout';

const FinishQuizPage = () => {
  const router = useRouter();

  const value = router.query.score * 10;

  return (
    <Layout>
      <div className="finishedQuiz">
        <div className="finishedQuiz__container">
          <div className={`finishedQuiz__header ${router.query.level?.toLowerCase()}`}>
            <SkillsIconSwitcher
              name={router.query.name?.toLowerCase()}
              className="icon-large primary-blue"
            />
            <div className="finishedQuiz__header--name-level">
              <span>
                {router.query.name} - {router.query.level}
              </span>
            </div>
          </div>
          <div className="finishedQuiz__conclusion">
            <span>Congratulations!</span>
            <span>Correct answers is {router.query.score}</span>
            <span>Your score is {router.query.score}</span>
            <div className="finishedQuiz__conclusion--progressbar">
              <CircularProgressbar
                strokeWidth={10}
                value={value}
                text={`${value}%`}
                // styles={{
                //   text: {
                //     fill: '#000',
                //     fontSize: '27px'
                //   },
                //   path: {
                //     stroke: '#0072AF'
                //   }
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinishQuizPage;
