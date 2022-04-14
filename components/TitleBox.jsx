import Link from 'next/link';

const TitleBox = ({ title, button, href, session }) => {
  return (
    <div className="title">
      <h2 className="title__heading">{title}</h2>
      {session && button && (
        <Link href={href} passHref>
          <a className="title__button">{button}</a>
        </Link>
      )}
    </div>
  );
};

export default TitleBox;
