import TitleBox from 'components/TitleBox';
import FinishedQuizes from 'components/FinishedQuizes';
import Quizes from 'components/Quizes';

const Quiz = () => {
  return (
    <div className="quiz">
      <section className="quiz__title">
        <TitleBox title="Test your skills" />
        <span>Here you can check your skills out</span>
      </section>
      {/* Finished quizes (component) */}
      <FinishedQuizes />

      {/* All quizes component */}
      <Quizes />
    </div>
  );
};

export default Quiz;
