import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';

// eslint-disable-next-line prettier/prettier
const skills = ["html", "css", "sass", "react", "javascript", "typescript", "tailwind", "node", "next", "angular", "csharp", "cplus", "php", "drupal", "java", "python", "postgres", "mongo", "wordpress", "net"]

const SkillsTags = ({ selectSkill, setSelectSkill }) => {
  const toggleSkill = (skill) => {
    selectSkill[0] === skill ? setSelectSkill(['']) : setSelectSkill([skill]);
  };

  return (
    <div className="skillstags">
      {skills.map((skill, i) => (
        <button
          key={i}
          className={`skillstags__button ${selectSkill[0] === skill ? 'active' : ''}`}
          onClick={() => toggleSkill(skill)}>
          <div>
            <SkillsIconSwitcher
              name={skill}
              className={`icon-large ${
                selectSkill[0] === skill ? 'primary-white' : 'primary-blue'
              }`}
            />
          </div>
          <span>{skill}</span>
        </button>
      ))}
    </div>
  );
};

export default SkillsTags;
