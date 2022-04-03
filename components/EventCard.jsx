import { useState } from 'react';
import { BookmarkIcon, TagIcon, TimeIcon, UsersIcon } from 'components/Icons/FontIcons';

const EventCard = ({ date, duration, title, tags, participants }) => {
  const [saved, setSaved] = useState(false);
  const day = date.substr(0, 2);
  const month = date.substr(3, 2);
  const year = date.substr(6, 4);
  const hour = date.substr(10, 6);
  const tag = tags.join(', ');
  return (
    <div className="eventcard">
      <div className="eventTimer">
        <span className="eventTimer_title">Start</span>
        <div className="eventTimeContainer">
          <div className="eventTime">
            <span className="eventTime__subtitle">Day</span>
            <span className="eventTime__number">{day}</span>
          </div>
          <div className="eventTime">
            <span className="eventTime__subtitle">Month</span>

            <span className="eventTime__number">{month}</span>
          </div>
          <div className="eventTime">
            <span className="eventTime__subtitle">Year</span>
            <span className="eventTime__number">{year}</span>
          </div>
          <div className="eventTime">
            <span className="eventTime__subtitle">Hour</span>
            <span className="eventTime__number">{hour}</span>
          </div>
        </div>
      </div>
      <div className="eventContent">
        <div className="eventContent__duration">
          <TimeIcon className="icon-small primary-blue" />
          <span>{duration}h</span>
        </div>
        <div className="eventDescription">
          <div className="eventDescription__title">{title}</div>
          <div className="eventDescription__subtitle">
            <TagIcon className="icon-small primary-blue" />
            <span>{tag}</span>
          </div>
        </div>
        <div className="eventDescription__footer">
          <button className="eventDescription__footer-btn">
            <UsersIcon className="icon-medium primary-blue" />
            <div className="eventDescription__footer-count">{participants.length}</div>
          </button>

          <button
            className={`eventDescription__link ${saved && 'active'}`}
            onClick={() => setSaved(!saved)}>
            <BookmarkIcon className="icon-medium primary-blue" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
