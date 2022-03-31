import ProfileCard from 'components/ProfileCard';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import { getUser, getUsers } from 'services/users/getUser';

export async function getStaticPaths() {
  const users = await getUsers();
  console.log(users, 'users');
  const paths = users.map((user) => ({
    params: { id: user._id.toString() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const user = await getUser(params.id);
  console.log(user, 'user staric props');
  return { props: { userProp: JSON.stringify(user) } };
}

const Profile = ({ userProp }) => {
  const user = JSON.parse(userProp);
  return (
    <div className="profile">
      <ProfileCard
        name={user?.name}
        imageUrl={user?.imageUrl}
        position={user?.position}
        langs={user?.languages}
        socials={user?.socials}
        about={user?.about}
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
