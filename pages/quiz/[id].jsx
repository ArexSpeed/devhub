import quizes from 'data/quiz.json';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import Question from 'components/Questions';

const IdQuizPage = () => {
  const router = useRouter();
  const [quiz, setQuiz] = useState({});

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

  useEffect(() => {
    const getQuiz = quizes.find((quiz) => quiz.quizid === router.query.id);
    console.log(getQuiz);
    setQuiz(getQuiz);
  }, [router]);

  const sendScores = () => {
    const scoresReduce = scores.reduce((prev, curr) => prev + curr.point, 0);
    console.log('wynik ', scoresReduce);
    router.push(`/quiz/finish?level=${quiz.level}&name=${quiz.quizname}&score=${scoresReduce}`);
  };

  return (
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
  );
};

export default IdQuizPage;
