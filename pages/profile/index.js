import { useState, useEffect } from 'react';
import users from 'data/users.json';
import TitleBox from 'components/TitleBox';
import ProfileCard from 'components/ProfileCard';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const userid = 1; //temporary user id

  useEffect(() => {
    const findUser = users.find((user) => user.userid === userid);
    setUser(findUser);
  }, []);
  return (
    <div className="profile">
      <TitleBox button="Edit profile" href="/profile/edit" />
      <ProfileCard
        name={user.name}
        position={user.position}
        langs={user.languages}
        socials={user.social}
      />
      <p>Skills</p>
      <div className="skillstags">
        {user?.skills?.map((skill, i) => (
          <button key={i} className="skillstags__button">
            <div>
              <SkillsIconSwitcher name={skill} className="icon-large primary-blue" />
            </div>
            <span>{skill}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
