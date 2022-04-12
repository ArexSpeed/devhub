import Image from 'next/image';
import logo from 'assets/logo.png';
import { BookmarkIcon, BookmarkOutlineIcon, NotificationIcon } from 'components/Icons/FontIcons';
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';

const Header = () => {
  const [session] = useSession();
  const [bookmarkHover, setBookmarkHover] = useState(false);
  const [user, setUser] = useState({});

  useEffect(async () => {
    if (session) {
      const user = await axios.get(`/api/user?id=${session.user.id}`);
      setUser(user.data);
    }
  }, [session]);

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
              <BookmarkIcon className="header__actions-icon icon-medium secondary-blue" />
            ) : (
              <BookmarkOutlineIcon className="header__actions-icon icon-medium secondary-blue" />
            )}
          </a>
        </Link>
        <Link href="/notifications" passHref>
          <a>
            <NotificationIcon className="header__actions-icon icon-medium secondary-blue" />
          </a>
        </Link>
        <div className="header__actions-user">
          <span>{session ? user.name : ''}</span>
          <div className="header__image">
            <img src={session ? user.imageUrl : ''} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
