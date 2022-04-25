import TitleBox from 'components/TitleBox';
import FinishedQuizes from 'components/FinishedQuizes';
import Quizes from 'components/Quizes';
import Layout from 'components/Layout';

import { getQuizzes, getFinishedQuizzes } from 'services/quizes/getQuizzes';
import { getSession } from 'next-auth/client';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log('session=>', session);
  const quizzes = await getQuizzes();
  const finishedQuizzes = await getFinishedQuizzes(session?.user?.id);
  console.log(finishedQuizzes);
  return {
    props: {
      quizzes: JSON.stringify(quizzes),
      finishedQuizzes: JSON.stringify(finishedQuizzes)
    }
  };
}

const Quiz = ({ quizzes, finishedQuizzes }) => {
  const dataQuizzes = JSON.parse(quizzes);
  const dataFinishedQuizzes = JSON.parse(finishedQuizzes);
  console.log(dataFinishedQuizzes);
  return (
    <Layout>
      <div className="quiz">
        <section className="quiz__title">
          <TitleBox title="Test your skills" />
          <span>Here you can check your skills out</span>
        </section>

        {/* Finished quizes (component) */}
        <div className="quiz__finished-quizes">
          <div className="quiz__finished-quizes--title">
            <span>Finished quizes</span>
          </div>
          <div className="quiz__all-quizes--quizes">
            {dataFinishedQuizzes.map((finishedQuiz) => (
              <FinishedQuizes
                key={finishedQuiz._id}
                level={finishedQuiz.quizlevel}
                scoreid={finishedQuiz._id}
                quizname={finishedQuiz.quizname}
                score={finishedQuiz.score}
                quizid={finishedQuiz.quizid}
              />
            ))}
          </div>
        </div>

        {/* All quizes component */}
        <div className="quiz__all-quizes">
          <div className="quiz__all-quizes--title">
            <span>Quizes</span>
          </div>
          <div className="quiz__all-quizes--quizes">
            {dataQuizzes?.map((quiz) => (
              <Quizes
                key={quiz._id}
                level={quiz.level}
                quizName={quiz.quizname}
                questions={quiz.questions}
                quizId={quiz._id}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
