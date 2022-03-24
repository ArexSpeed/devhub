import React from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div>Profile {router.query.id}</div>
  )
}

export default Profile;