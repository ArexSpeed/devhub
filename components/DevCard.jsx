import React from 'react'
import { DrupalIcon, JavaScriptIcon, ReactIcon } from './Icons'

const DevCard = () => {
  return (
    <div className="devcard">
      <article className="devcard__top">
        <div className="devcard__image"></div>
        <div className="devcard__details">
          <div className="devcard__details--langs">PL, ENG, GER</div>
          <div className="devcard__details--name">Arek Cichocki</div>
          <div className="devcard__details--title">Frontend Developer</div>
        </div>
      </article>
      <div className="devcard__smalltext">Main skills</div>
      <article className="devcard__skills">
        <ReactIcon className="icon-medium primary-blue" />
        <JavaScriptIcon className="icon-medium primary-blue" />
        <DrupalIcon className="icon-medium primary-blue" />
      </article>
      <article className="devcard__buttons">
        <button className="devcard__button devcard__button-profile">Profile</button>
        <button className="devcard__button devcard__button-follow">Follow</button>
      </article>
      <article className="devcard__social"></article>
    </div>
  )
}

export default DevCard