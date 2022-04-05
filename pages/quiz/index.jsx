import TitleBox from 'components/TitleBox';
import FinishedQuizes from 'components/FinishedQuizes';
import Quizes from 'components/Quizes';
import Layout from 'components/Layout';

const Quiz = () => {
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
        <Quizes />
      </div>
    </Layout>
  );
};

export default Quiz;
