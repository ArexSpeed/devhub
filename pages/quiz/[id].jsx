import { useRouter } from 'next/router';
import { useState } from 'react';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import Question from 'components/Question';
import Layout from 'components/Layout';

import { getQuizzes, getQuiz } from 'services/quizes/getQuizzes';

export async function getStaticPaths() {
  const quizzes = await getQuizzes();
  const paths = quizzes.map((quiz) => ({
    params: { id: quiz._id.toString() }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const quiz = await getQuiz(params.id);
  return { revalidate: 30, props: { quizProp: JSON.stringify(quiz) } };
}

const IdQuizPage = ({ quizProp }) => {
  const quiz = JSON.parse(quizProp);
  const router = useRouter();

  const [scores, setScores] = useState([
    {
      questionid: '1',
      point: 0
    },
    {
      questionid: '2',
      point: 0
    },
    {
      questionid: '3',
      point: 0
    },
    {
      questionid: '4',
      point: 0
    },
    {
      questionid: '5',
      point: 0
    }
  ]);

  // useEffect(() => {
  //   const getQuiz = quiz.find((quiz) => quiz.quizid === router.query.id);
  //   //console.log(getQuiz);
  //   setQuiz(getQuiz);
  // }, [router]);

  const sendScores = () => {
    const scoresReduce = scores.reduce((prev, curr) => prev + curr.point, 0);
    router.push(`/quiz/finish?level=${quiz.level}&name=${quiz.quizname}&score=${scoresReduce}`);
  };

  return (
    <Layout>
      <div className="quizPage">
        <div className="quizPage__container">
          <div className={`quizPage__header ${quiz?.level?.toLowerCase()}`}>
            <SkillsIconSwitcher
              name={quiz?.quizname?.toLowerCase()}
              className="icon-large primary-blue"
            />
            <div className="quizPage__header--name-level">
              <span>
                {quiz?.quizname} - {quiz?.level}
              </span>
              <span> {quiz?.questions?.length} questions</span>
            </div>
          </div>
          {quiz?.questions?.map((question) => (
            <Question
              key={question.questionid}
              question={question ? question : 'questions not found'}
              scores={scores}
              setScores={setScores}
            />
          ))}
          <div className="quizPage__container--btn">
            <button onClick={sendScores}>Finish test</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IdQuizPage;
