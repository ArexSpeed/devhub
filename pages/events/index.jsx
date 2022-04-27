import { useState, useEffect } from 'react';
import TitleBox from 'components/TitleBox';
import SkillsTags from 'components/SkillsTags';
import EventCard from 'components/EventCard';
import Layout from 'components/Layout';
import SearchBox from 'components/SearchBox';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import ButtonsEvents from 'components/ButtonsEvents';
import EventLoader from 'components/EventLoader';

const EventsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [session, loading] = useSession();
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState([]);
  const [activeButton, setActiveButton] = useState('Incoming');
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    const getEvents = await axios.get('/api/events');
    setEvents(getEvents.data);
    console.log(getEvents.data);
  }, []);

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
          <ButtonsEvents
            value1="Incoming"
            value2="You might like"
            value3="Saved"
            setActiveButton={setActiveButton}
            activeButton={activeButton}
          />
        </section>
        <section className="events__cards">
          {loading ? (
            <EventLoader />
          ) : (
            events
              .filter((event) => event.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((event) => (
                <EventCard
                  key={event.eventid}
                  date={event.date}
                  duration={event.duration}
                  title={event.title}
                  tags={event.tags}
                  participants={event.participants}
                  eventid={event._id}
                />
              ))
          )}
        </section>
      </div>
    </Layout>
  );
};

export default EventsPage;
