import LoginForm from 'components/Forms/LoginForm';
import RegisterForm from 'components/Forms/RegisterForm';
import { useSession } from 'next-auth/client';

export default function Home() {
  const [session] = useSession();

  return session ? (
    <div className="home">
      Hello, {session.user.name}, {session.user.id}
    </div>
  ) : (
    <div className="home">
      <LoginForm />
      <p>Register below if you do not have an account</p>
      <RegisterForm />
    </div>
  );
}
