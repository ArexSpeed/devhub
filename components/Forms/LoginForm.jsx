import React from 'react';

const LoginForm = () => {
  return (
    <div className="form">
      <div className="form__header">Login to your account</div>
      <form action="#">
        <div className="form__error">Something went wrong</div>
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
        <button type="submit" className="form__button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
