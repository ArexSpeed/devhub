import quizes from 'data/quiz.json';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import Question from 'components/Questions';

const IdQuizPage = () => {
  const router = useRouter();
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    const getQuiz = quizes.find((quiz) => quiz.quizid === router.query.id);
    console.log(getQuiz);
    setQuiz(getQuiz);
  }, [router]);

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
            question={question ? question : 'question not found'}
          />
        ))}
        <div className="quizPage__container--btn">
          <button>Finish test</button>
        </div>
      </div>
    </div>
  );
};

export default IdQuizPage;
