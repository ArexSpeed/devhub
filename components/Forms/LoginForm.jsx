import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { signIn } from 'next-auth/client';

const LoginForm = () => {
  const [session] = useSession();
  const loginForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  if (session) {
    router.push('/community');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(loginForm.current);
    console.log(form.get('email'));
    const { ok } = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    if (ok) {
      router.push('/community');
    } else {
      setError('Not authorized. Try again.');
      setFormProcessing(false);
    }
  };
  return (
    <div className="form">
      <div className="form__header">Login to your account</div>
      <form onSubmit={handleSubmit} ref={loginForm}>
        {error && <div className="form__error">{error}</div>}
        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            className="form__input"
            type="text"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form__field">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="form__button" disabled={formProcessing}>
          {formProcessing ? 'Checking...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
