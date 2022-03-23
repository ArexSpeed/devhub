import { useState } from "react";
import { SearchIcon } from "components/Icons";
import SkillsTags from "components/SkillsTags";
import TitleSite from "components/TitleSite";
import DevCard from "components/DevCard";
import users from "data/users.json";

const ComminityPage = () => {
  const [activeButton, setActiveButton] = useState();
  const [developerPosition, setDeveloperPosition] = useState('');

  return (
    <div className="community">
      {console.log(developerPosition)}
      <section className="community__title">
        <TitleSite title="Developers Community" />
      </section>
      <section className="community__searchBox">
      <div className="community__search">
          <SearchIcon className="icon-medium primary-blue" />
          <input
            type="text"
            placeholder="Search Developer by name"
          />
        </div>
        <select 
          className="community__selector"
          onChange={(e) => setDeveloperPosition(e.target.value)}
         >
          <option value="">All Developers</option>
          <option value="Frontend Developer">Frontend Developers</option>
          <option value="Backend Developer">Backend Developers</option>
          <option value="Fullstack Developer">Fullstack Developers</option>
        </select>
      </section>
      <p>Find developer by skills</p>
      <section className="community__tags">
        <SkillsTags />
      </section>
      <section className="community__buttons">
        <button 
          className={activeButton ===  "All Developers" ? "community__button active" : "community__button"}
          onClick={() => setActiveButton("All Developers")}
        >
            All Developers
        </button>
        <button 
          className={activeButton ===  "Followed" ? "community__button active" : "community__button"}
          onClick={() => setActiveButton("Followed")}>
          Followed
        </button>
        <button 
         className={activeButton ===  "Followers" ? "community__button active" : "community__button"}
          onClick={() => setActiveButton("Followers")}
        >
          Followers
        </button>
      </section>
      <section className="community__profiles">
        {users
        .filter((user) => user.job.includes(developerPosition))
        .map((user) => (
          <DevCard key={user.id} id={user.id} name={user.name} job={user.job} />
        ))}
      </section>
    </div>
  )
}

export default ComminityPage;