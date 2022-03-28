import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
// eslint-disable-next-line prettier/prettier
import { BlogIcon, CommunityIcon, EventIcon, HomeIcon, LogoutIcon, ProfileIcon, ProjectIcon, QuizIcon } from 'components/Icons/FontIcons';

const Navigation = () => {
  const router = useRouter();
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link href="/" passHref>
            <a className={router.pathname === '/' ? 'nav__link active' : 'nav__link'}>
              <HomeIcon className="icon-medium primary-blue" />
              <span>Home</span>
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="/community" passHref>
            <a className={router.pathname === '/community' ? 'nav__link active' : 'nav__link'}>
              <CommunityIcon className="icon-medium primary-blue" />
              <span>Community</span>
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="/blog" passHref>
            <a className={router.pathname === '/blog' ? 'nav__link active' : 'nav__link'}>
              <BlogIcon className="icon-medium primary-blue" />
              <span>Blog</span>
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="/events" passHref>
            <a className={router.pathname === '/events' ? 'nav__link active' : 'nav__link'}>
              <EventIcon className="icon-medium primary-blue" />
              <span>Events</span>
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="/projects" passHref>
            <a className={router.pathname === '/projects' ? 'nav__link active' : 'nav__link'}>
              <ProjectIcon className="icon-medium primary-blue" />
              <span>Projects</span>
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="/quiz" passHref>
            <a className={router.pathname === '/quiz' ? 'nav__link active' : 'nav__link'}>
              <QuizIcon className="icon-medium primary-blue" />
              <span>Quiz</span>
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="/profile" passHref>
            <a className="nav__link">
              <ProfileIcon className="icon-medium primary-blue" />
              <span>Profile</span>
            </a>
          </Link>
        </li>
      </ul>
      <ul className="nav__list">
        <li className="nav__item">
          <Link href="/" passHref onClick={signOut}>
            <a className="nav__link">
              <LogoutIcon className="icon-medium primary-blue" />
              <span>Logout</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
