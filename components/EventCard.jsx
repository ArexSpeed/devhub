import { useState, useEffect } from 'react';
import { BookmarkIcon, TagIcon, TimeIcon, UsersIcon } from 'components/Icons/FontIcons';
import { useSession } from 'next-auth/client';
import axios from 'axios';

const EventCard = ({ date, duration, title, tags, eventid }) => {
  const [session] = useSession();
  const [isSaved, setIsSaved] = useState(false);
  const [saves, setSaves] = useState([]);
  const tag = tags.join(', ');

  useEffect(async () => {
    const result = await axios.get(`/api/events/saves?eventid=${eventid}`);
    setSaves(result.data);
  }, [isSaved]);

  useEffect(() => {
    if (session) {
      const findLike = saves?.find((participant) => participant.userid === session.user.id);
      if (findLike) setIsSaved(true);
    }
  }, [saves]);

  const addLike = async () => {
    const newLikesArr = [...saves, { userid: session.user.id, username: session.user.name }];
    const payload = {
      participants: newLikesArr
    };
    const response = await fetch(`/api/events/saves?eventid=${eventid}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setIsSaved(true);
      console.log('something went good');
    } else {
      console.log('something went wrong');
      console.log(eventid);
    }
  };

  const removeLike = async () => {
    const newLikesArr = saves.filter((save) => save.userid !== session.user.id);
    const payload = {
      participants: newLikesArr
    };
    const response = await fetch(`/api/events/saves?eventid=${eventid}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setIsSaved(false);
      console.log('something went good');
    } else {
      console.log('something went wrong');
      console.log(eventid);
    }
  };

  // 2022-05-09T10:00
  return (
    <div className="eventcard">
      <div className="eventTimer">
        <span className="eventTimer_title">Start</span>
        <div className="eventTimeContainer">
          <div className="eventTime">
            <span className="eventTime__subtitle">Day</span>
            <span className="eventTime__number">{date.substr(8, 2)}</span>
          </div>
          <div className="eventTime">
            <span className="eventTime__subtitle">Month</span>

            <span className="eventTime__number">{date.substr(5, 2)}</span>
          </div>
          <div className="eventTime">
            <span className="eventTime__subtitle">Year</span>
            <span className="eventTime__number">{date.substr(0, 4)}</span>
          </div>
          <div className="eventTime">
            <span className="eventTime__subtitle">Hour</span>
            <span className="eventTime__number">{date.substr(11, 5)}</span>
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
            <div className="eventDescription__footer-count">{saves.length}</div>
          </button>

          <button
            className={`eventDescription__link ${!isSaved && 'active'}`}
            onClick={isSaved && session ? removeLike : addLike}>
            <BookmarkIcon className="icon-medium primary-blue" />
            <span>{!isSaved ? 'Save' : 'Saved'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
