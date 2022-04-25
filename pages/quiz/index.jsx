import TitleBox from 'components/TitleBox';
import FinishedQuizes from 'components/FinishedQuizes';
import Quizes from 'components/Quizes';
import Layout from 'components/Layout';

import { getQuizzes } from 'services/quizes/getQuizzes';

export async function getServerSideProps() {
  const quizzes = await getQuizzes();
  return {
    props: { quizzes: JSON.stringify(quizzes) }
  };
}

const Quiz = ({ quizzes }) => {
  const data = JSON.parse(quizzes);
  return (
    <Layout>
      <div className="quiz">
        <section className="quiz__title">
          <TitleBox title="Test your skills" />
          <span>Here you can check your skills out</span>
        </section>

        {/* Finished quizes (component) */}
        <FinishedQuizes />

        {/* All quizes component */}
        <div className="quiz__all-quizes">
          <div className="quiz__all-quizes--title">
            <span>Quizes</span>
          </div>
          <div className="quiz__all-quizes--quizes">
            {data?.map((quiz) => (
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
