import Image from 'next/image';
import logo from 'assets/logo.png';
import avatar from 'assets/avatar.jpg';
import { BookmarkIcon, BookmarkOutlineIcon, NotificationIcon } from 'components/Icons/FontIcons';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [bookmarkHover, setBookmarkHover] = useState(false);
  return (
    <header className="header">
      <div className="header__logo">
        <Image src={logo} width={40} height={40} alt="logo" />
        <span>CapDev</span>
      </div>
      <div className="header__actions">
        <Link href="/bookmarks" passHref>
          <a
            onMouseEnter={() => setBookmarkHover(true)}
            onMouseLeave={() => setBookmarkHover(false)}>
            {!bookmarkHover ? (
              <BookmarkIcon className="header__actions-icon icon-medium primary-blue" />
            ) : (
              <BookmarkOutlineIcon className="header__actions-icon icon-medium primary-blue" />
            )}
          </a>
        </Link>
        <Link href="/notifications" passHref>
          <a>
            <NotificationIcon className="header__actions-icon icon-medium primary-blue" />
          </a>
        </Link>
        <div className="header__actions-user">
          <span>Arek Cichocki</span>
          <Image src={avatar} width={40} height={40} objectFit="contain" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
