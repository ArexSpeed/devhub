import { useState, useRef } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';

// eslint-disable-next-line prettier/prettier
const skillsArray = ["html", "css", "sass", "react", "javascript", "typescript", "tailwind", "node", "next", "angular", "csharp", "cplus", "php", "drupal", "java", "python", "postgres", "mongo", "wordpress", "net"]

const ProjectAdd = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const eventForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [checkedSkills, setCheckedSkills] = useState([]);

  const checkSkill = (newSkill) => {
    const findSkills = checkedSkills.find((skill) => skill === newSkill);
    if (findSkills) {
      const filterSkills = checkedSkills.filter((skill) => skill !== findSkills);
      setCheckedSkills(filterSkills);
    } else {
      setCheckedSkills((prev) => [...prev, newSkill]);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(eventForm.current);
    const payload = {
      title: form.get('title'),
      userid: session.user.id,
      username: session.user.name,
      userimage: session.user.image,
      date: form.get('date'), //save 2022-04-05T18:00
      duration: form.get('duration'),
      tags: checkedSkills
    };

    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setFormProcessing(false);
      router.push('/events');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  }

  if (loading) {
    return <div className="form">Loading...</div>;
  }

  return (
    <div className="events center">
      <div className="form">
        <div className="form__header">Add new event</div>
        <form onSubmit={handleSubmit} ref={eventForm}>
          {error && <div className="form__error">{error}</div>}
          <div className="form__field">
            <label htmlFor="title" className="form__label">
              Title
            </label>
            <input
              className="form__input"
              type="text"
              name="title"
              placeholder="Event name"
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="date" className="form__label">
              Date
            </label>
            <input className="form__input" type="datetime-local" name="date" required />
          </div>
          <div className="form__field">
            <label htmlFor="duration" className="form__label">
              Duration
            </label>
            <input
              className="form__input"
              type="number"
              name="duration"
              min="0"
              max="24"
              step="0.5"
              placeholder="Event duration (h)"
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="tags" className="form__label">
              Tags
            </label>
            <div className="skillstags" style={{ marginBottom: '16px' }}>
              {skillsArray.map((skill, i) => (
                <button
                  type="button"
                  key={i}
                  className={`skillstags__button ${
                    checkedSkills.find((item) => item === skill) ? 'active' : ''
                  }`}
                  onClick={() => checkSkill(skill)}>
                  <div>
                    <SkillsIconSwitcher
                      name={skill}
                      className={`icon-large ${
                        checkedSkills.find((item) => item === skill)
                          ? 'primary-white'
                          : 'primary-blue'
                      }`}
                    />
                  </div>
                  <span>{skill}</span>
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectAdd;
