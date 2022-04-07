import React from 'react';
import users from 'data/users.json';
import DevCard from 'components/DevCard';

const UsersAnimations = () => {
  return (
    <div className="animations">
      {users.map((user, i) => (
        <div key={i} className="card">
          <DevCard
            id={user.userid}
            name={user.name}
            image={user.imageUrl}
            position={user.position}
            skills={user.skills}
            langs={user.languages}
            socials={user.socials}
          />
        </div>
      ))}
    </div>
  );
};

export default UsersAnimations;
