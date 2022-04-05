import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import ProfileForm from 'components/Forms/ProfileForm';
import Layout from 'components/Layout';

const ProfileEdit = () => {
  const [session] = useSession();
  const [user, setUser] = useState({});

  useEffect(async () => {
    if (session) {
      const user = await axios.get(`/api/user?id=${session.user.id}`);
      setUser(user.data);
    }
  }, [session]);
  return (
    <Layout>
      <div className="profile center">
        <ProfileForm
          name={user.name}
          email={user.email}
          imageUrl={user.imageUrl}
          position={user.position}
          languages={user.languages}
          skills={user.skills}
          about={user.about}
          socials={user.socials}
        />
      </div>
    </Layout>
  );
};

export default ProfileEdit;
