import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import users from 'data/users.json';
import ProfileCard from 'components/ProfileCard';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const findUser = users.find((user) => user.userid === +router.query.id);
    setUser(findUser);
  }, []);
  return (
    <div className="profile">
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

export default Profile;
