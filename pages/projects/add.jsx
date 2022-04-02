import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import { useState, useRef } from 'react';

// eslint-disable-next-line prettier/prettier
const skillsArray = ["html", "css", "sass", "react", "javascript", "typescript", "tailwind", "node", "next", "angular", "csharp", "cplus", "php", "drupal", "java", "python", "postgres", "mongo", "wordpress", "net"]

const ProjectAdd = () => {
  const projectForm = useRef();
  const [error, setError] = useState();
  //const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [checkedSkills, setCheckedSkills] = useState([]);

  const handleImagePreview = (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    setImagePreview(url);
  };

  const checkSkill = (newSkill) => {
    const findSkills = checkedSkills.find((skill) => skill === newSkill);
    if (findSkills) {
      const filterSkills = checkedSkills.filter((skill) => skill !== findSkills);
      setCheckedSkills(filterSkills);
    } else {
      setCheckedSkills((prev) => [...prev, newSkill]);
    }
  };

  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <div className="center">
      <div className="form">
        <div className="form__header">Add new project</div>
        <form onSubmit={handleSubmit} ref={projectForm}>
          {error && <div className="form__error">{error}</div>}
          <div className="form__image">
            <img src={imagePreview} alt="" />
          </div>
          <div className="form__field">
            <label htmlFor="logo" className="form__label">
              Logo
            </label>
            <input
              className="form__upload"
              type="file"
              name="logo"
              id="logo"
              onChange={(e) => handleImagePreview(e)}
            />
          </div>
          <div className="form__field">
            <label htmlFor="name" className="form__label">
              Name
            </label>
            <input
              className="form__input"
              type="text"
              name="name"
              placeholder="Enter your project name"
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="link" className="form__label">
              Link
            </label>
            <input
              className="form__input"
              type="text"
              name="link"
              placeholder="Link to your project"
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="description" className="form__label">
              Description
            </label>
            <textarea
              className="form__textarea"
              name="description"
              placeholder="Write a couple words about this project"
            />
          </div>
          <div className="form__field">
            <label htmlFor="technology" className="form__label">
              Technology
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
