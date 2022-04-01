import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import quizes from 'data/quiz.json';

const QuizPage = () => {
  const [quiz, setQuiz] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getQuiz = quizes.find((quiz) => quiz.quizid === router.query.id);
    console.log(getQuiz);
    setQuiz(getQuiz);
  }, []);

  return <div>quiz</div>;
};

export default QuizPage;
