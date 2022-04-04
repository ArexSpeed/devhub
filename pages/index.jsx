import { useState, useEffect } from 'react';
import Image from 'next/image';
import LoginForm from 'components/Forms/LoginForm';
import RegisterForm from 'components/Forms/RegisterForm';
import { useSession } from 'next-auth/client';
import picture from 'assets/picture.svg';
import Link from 'next/link';
// eslint-disable-next-line prettier/prettier
import { BlogIcon, CommunityIcon, EventIcon, ProjectIcon, QuizIcon } from 'components/Icons/FontIcons';
import UsersAnimations from 'components/Animation/UsersAnimations';
import PostsAnimations from 'components/Animation/PostsAnimations';


export default function Home() {
  const [session] = useSession();
  const [login, setLogin] = useState(true);
  const [expertName, setExpertName] = useState(0);

  const experts = ['Frontend', 'Backend', 'Design'];

  useEffect(() => {
    //console.log(expertName, 'start Effect');
    const intervalId = setInterval(() => {
      if (expertName === 2) {
        setExpertName(0);
      } else {
        setExpertName((prev) => prev + 1);
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [expertName]);

  return session ? (
    <div className="home">
      {console.log(expertName, 'start render')}
      <section className="home__hello">
        <div className="home__left">
          <h1>
            Hello, <span className="home__left-name">{session.user.name}</span>
          </h1>
          <h2>Check your community and get some dev news!</h2>
        </div>
        <div className="home__right">
          <Image src={picture} alt="Hello" objectFit="contain" />
        </div>
      </section>
      <section className="home__nav">
        <Link href="/community" passHref>
          <a className="home__nav-item">
            <CommunityIcon className="icon-huge primary-blue" />
            <span>Community</span>
          </a>
        </Link>
        <Link href="/blog" passHref>
          <a className="home__nav-item">
            <BlogIcon className="icon-huge primary-blue" />
            <span>Blog</span>
          </a>
        </Link>
        <Link href="/events" passHref>
          <a className="home__nav-item">
            <EventIcon className="icon-huge primary-blue" />
            <span>Events</span>
          </a>
        </Link>
        <Link href="/projects" passHref>
          <a className="home__nav-item">
            <ProjectIcon className="icon-huge primary-blue" />
            <span>Projects</span>
          </a>
        </Link>
        <Link href="/quiz" passHref>
          <a className="home__nav-item">
            <QuizIcon className="icon-huge primary-blue" />
            <span>Quiz</span>
          </a>
        </Link>
      </section>
    </div>
  ) : (
    <div className="home">
      <section className="home__container top">
        <div className="home__left top">
          <h1>
            Welcome to the <span className="home__left-name">CapDev Community</span>
          </h1>
          <h2>Find perfect developer for your project!</h2>
        </div>
        <div className="home__right">
          {login ? (
            <>
              <LoginForm />
              <div className="form sign" style={{ marginTop: '16px' }}>
                Do not have an account{' '}
                <button className="home__button" onClick={() => setLogin(false)}>
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <RegisterForm />
              <div className="form sign" style={{ marginTop: '16px' }}>
                You already have an account?{' '}
                <button className="home__button" onClick={() => setLogin(true)}>
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="home__container bottom">
        <div className="home__right top">
          <UsersAnimations />
        </div>
        <div className="home__left">
          <h1>
            The best experts in <span className="home__left-name">{experts[expertName]}</span>
          </h1>
          <h2>Our developers know incredible technologies!</h2>
        </div>
      </section>
      <section className="home__container top">
        <div className="home__left top">
          <h1>
            Amazing <span className="home__left-name">Content</span> from our Authors.
          </h1>
          <h2>Improve your knowledge in our blog!</h2>
        </div>
        <div className="home__right top">
          <PostsAnimations />
        </div>
      </section>
    </div>
  );
}
