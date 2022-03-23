import React from 'react'
import { DrupalIcon, JavaScriptIcon, ReactIcon } from './Icons'

const skills = [
  {
    id: 1,
    name: "React",
    icon: <ReactIcon className='icon-large primary-blue' />
  },
  {
    id: 2,
    name: "JavaScript",
    icon: <JavaScriptIcon className='icon-large primary-blue' />
  },
  {
    id: 3,
    name: "Drupal",
    icon: <DrupalIcon className='icon-large primary-blue' />
  },
];

const SkillsTags = () => {

  return (
    <div className="skillstags">
    {skills.map((skill, id) => (
      <div key={id} className="skillstags__box">
        <div>{skill.icon}</div>
        <span>{skill.name}</span>
      </div>
    ))}
    </div>
  )
}

export default SkillsTags