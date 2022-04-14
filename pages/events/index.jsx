import { useState } from 'react';
import TitleBox from 'components/TitleBox';
import SkillsTags from 'components/SkillsTags';
import EventCard from 'components/EventCard';
import events from 'data/events.json';
import Layout from 'components/Layout';
import { motion } from 'framer-motion';
import SearchBox from 'components/SearchBox';

const EventsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState([]);
  const [activeButton, setActiveButton] = useState('Incoming');

  return (
    <Layout>
      <div className="events">
        <section className="events__title">
          <TitleBox title="Events" button="Add new event" href="/events/add" />
        </section>
        <section className="searchbox__container">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder="Find event by title"
          />
        </section>
        <p>Find event by tags</p>
        <section className="events__tags">
          <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
        </section>
        <section className="filters">
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
            className={activeButton === 'Incoming' ? 'filters__button active' : 'filters__button'}
            onClick={() => setActiveButton('Incoming')}>
            Incoming
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
            className={activeButton === 'Like' ? 'filters__button active' : 'filters__button'}
            onClick={() => setActiveButton('Like')}>
            You might like
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
            className={activeButton === 'Saved' ? 'filters__button active' : 'filters__button'}
            onClick={() => setActiveButton('Saved')}>
            Saved
          </motion.button>
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
