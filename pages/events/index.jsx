import { useState } from 'react';
import TitleBox from 'components/TitleBox';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import EventCard from 'components/EventCard';
import events from 'data/events.json';
import Layout from 'components/Layout';

const EventsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState([]);
  const [activeButton, setActiveButton] = useState('');

  return (
    <Layout>
      <div className="events">
        <section className="events__title">
          <TitleBox title="Events" button="Add new event" href="/events/add" />
        </section>
        <section className="projects__searchcontainer">
          <div className="projects__searchbox">
            <div className="projects__searchbox-icon">
              <SearchIcon className="icon-medium secondary-blue" />
            </div>
            <input
              type="text"
              className="projects__searchbox-input"
              placeholder="Search Developer by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </section>
        <p>Find event by tags</p>
        <section className="events__tags">
          <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
        </section>
        <section className="events__buttons">
          <button
            className={
              activeButton === 'Incoming' ? 'community__button active' : 'community__button'
            }
            onClick={() => setActiveButton('Incoming')}>
            Incoming
          </button>
          <button
            className={activeButton === 'Like' ? 'community__button active' : 'community__button'}
            onClick={() => setActiveButton('Like')}>
            You might like
          </button>
          <button
            className={activeButton === 'Saved' ? 'community__button active' : 'community__button'}
            onClick={() => setActiveButton('Saved')}>
            Saved
          </button>
        </section>
        <section className="events__cards">
          {events
            .filter((event) => event.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((event) => (
              <EventCard
                key={event.eventid}
                date={event.date}
                duration={event.duration}
                title={event.title}
                tags={event.tags}
                participants={event.participants}
              />
            ))}
        </section>
      </div>
    </Layout>
  );
};

export default EventsPage;
