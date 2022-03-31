import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import TitleBox from 'components/TitleBox';
import ProfileCard from 'components/ProfileCard';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';

const ProfilePage = () => {
  const [session] = useSession();
  const [user, setUser] = useState({});

  useEffect(async () => {
    if (session) {
      const user = await axios.get(`/api/user?id=${session.user.id}`);
      setUser(user.data);
    }
  }, [session]);
  return (
    <div className="profile">
      <TitleBox button="Edit profile" href="/profile/edit" />
      <ProfileCard
        name={user.name}
        position={user.position}
        langs={user.languages}
        socials={user.socials}
        about={user.about}
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
