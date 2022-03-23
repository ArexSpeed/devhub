import { useState } from "react";
import SkillsTags from "components/SkillsTags";
import TitleSite from "components/TitleSite";
import DevCard from "components/DevCard";
import { SearchIcon } from "components/Icons";

const CommunityPage = () => {
  const [activeButton, setActiveButton] = useState('All Developers');
  return (
    <div className="community">
      <section className="community__title">
        <TitleSite title="Developers Community" />
      </section>

      <section className="community__searchBox">
        <div className="community__search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Developer by name"
          />
        </div>
        <select className="community__selector">
          <option value="All Developers">All Developers</option>
          <option value="Frontend Developers">Frontend Developers</option>
          <option value="Backend Developers">Backend Developers</option>
          <option value="Fullstack Developers">Fullstack Developers</option>
        </select>
      </section>
      <p>Find developer by skills</p>
      <section className="community__tags">
        <SkillsTags />
      </section>
      <section className="community__buttons">
        <button 
          className={activeButton === 'All Developers' ? "community__button active" : "community__button"}
          onClick={() => setActiveButton("All Developers")}
        >
            All Developers
        </button>
        <button 
          className={activeButton === 'Followed' ? "community__button active" : "community__button"}
          onClick={() => setActiveButton("Followed")}
        >
            Followed
        </button>
        <button className="community__button">Followers</button>
      </section>
      <section className="community__profiles">
        <DevCard />
      </section>
    </div>
  )
}

export default CommunityPage;