import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';

// eslint-disable-next-line prettier/prettier
const skills = ["html", "css", "sass", "react", "javascript", "typescript", "tailwind", "node", "next", "angular", "csharp", "cplus", "php", "drupal", "java", "python", "postgres", "mongo", "wordpress", "net"]

const SkillsTags = ({ selectSkill, setSelectSkill }) => {
  const addSkill = (newSkill) => {
    const findSkills = selectSkill.find((skill) => skill === newSkill);
    if (findSkills) {
      const filterSkills = selectSkill.filter((skill) => skill !== findSkills);
      setSelectSkill(filterSkills);
    } else {
      setSelectSkill((prev) => [...prev, newSkill]);
    }
  };

  return (
    <div className="skillstags">
      {skills.map((skill, i) => (
        <button
          key={i}
          className={`skillstags__button ${
            selectSkill.find((item) => item === skill) ? 'active' : ''
          }`}
          onClick={() => addSkill(skill)}>
          <div>
            <SkillsIconSwitcher
              name={skill}
              className={`icon-large ${
                selectSkill.find((item) => item === skill) ? 'primary-white' : 'primary-blue'
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
