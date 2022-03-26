import { useRef, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

const Login = () => {
  const [session, loading] = useSession();
  const loginForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  console.log(session, 'session');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(loginForm.current);
    const { ok } = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    if (ok) {
      router.push('/');
    } else {
      setError('Wrong password or login');
      setFormProcessing(false);
    }
  };

  return (
    !session &&
    !loading && (
      <form onSubmit={handleSubmit} ref={loginForm}>
        <div>
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div>
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>

        <button type="submit" disabled={formProcessing}>
          {formProcessing ? 'Process...' : 'Login'}
        </button>
        {error && <div>{error}</div>}
        <p>
          You dont have an account?
          <Link href="/register">
            <button>Register</button>
          </Link>
        </p>
      </form>
    )
  );
};

export default Login;
