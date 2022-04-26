import TitleBox from 'components/TitleBox';
import FinishedQuizes from 'components/FinishedQuizes';
import Quizes from 'components/Quizes';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';

import { getQuizzes, getFinishedQuizzes } from 'services/quizes/getQuizzes';
import { getSession, useSession } from 'next-auth/client';

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

const finishedQuizzesByOneUser = (finishedQuizzes, userId) => {
  const filteredQuizzesByUserId = finishedQuizzes.filter((quiz) => quiz.userid === userId);

  const sorted = filteredQuizzesByUserId.sort((a, b) => a.quizid - b.quizid || a.score - b.score);

  const finalArray = Object.values(
    sorted.reduce((prev, curr) => {
      if (curr.quizid in prev) {
        if (curr.score > prev[curr.quizid].score) prev[curr.quizid] = Object.assign({}, curr);
      } else {
        prev[curr.quizid] = Object.assign({}, curr);
      }
      return prev;
    }, {})
  );

  return finalArray;
};

const Quiz = ({ quizzes, finishedQuizzes }) => {
  const [session] = useSession();

  const [bestQuizzes, setBestQuizzes] = useState([]);

  const dataQuizzes = JSON.parse(quizzes);
  const dataFinishedQuizzes = JSON.parse(finishedQuizzes);

  useEffect(() => {
    if (session) {
      setBestQuizzes(finishedQuizzesByOneUser(dataFinishedQuizzes, session.user.id));
    }
  }, [session]);

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
            <span>Finished quizzes {bestQuizzes.length}</span>
          </div>
          <div className="quiz__finished-quizes--results">
            {dataFinishedQuizzes.length === 0 ? (
              <p>You have no finished quizzes yet 😞</p>
            ) : !session ? (
              <p>Loading...</p>
            ) : (
              bestQuizzes.map((finishedQuiz) => (
                <FinishedQuizes
                  key={finishedQuiz._id}
                  level={finishedQuiz.quizlevel}
                  scoreid={finishedQuiz._id}
                  quizname={finishedQuiz.quizname}
                  score={finishedQuiz.score}
                  quizid={finishedQuiz.quizid}
                />
              ))
            )}
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
