import React from 'react';
import users from 'data/users.json';
import DevCard from 'components/DevCard';

const UsersAnimations = () => {
  return (
    <div className="animations">
      {users.map((user) => (
        <div key={user.id} className="card">
          <DevCard
            id={user.id}
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
