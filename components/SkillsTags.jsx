import { useState } from 'react';
import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';

// eslint-disable-next-line prettier/prettier
const skills = ["html", "css", "sass", "react", "javascript", "typescript", "tailwind", "node", "next", "angular", "csharp", "cplus", "php", "drupal", "java", "python", "postgres", "mongo", "wordpress", "net"]

const SkillsTags = () => {
  const [selectSkill, setSelectSkill] = useState('react');
  return (
    <div className="skillstags">
      {skills.map((skill, i) => (
        <button
          key={i}
          className={`skillstags__button ${selectSkill === skill ? 'active' : ''}`}
          onClick={() => setSelectSkill(skill)}>
          <div>
            <SkillsIconSwitcher
              name={skill}
              className={`icon-large ${selectSkill === skill ? 'primary-white' : 'primary-blue'}`}
            />
          </div>
          <span>{skill}</span>
        </button>
      ))}
    </div>
  );
};

export default SkillsTags;
