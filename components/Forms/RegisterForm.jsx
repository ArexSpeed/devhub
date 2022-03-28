import React from 'react';

const RegisterForm = () => {
  return (
    <div className="form">
      <section className="form__form">
        <div className="form__header">Create your new developer account</div>
        <form action="#">
          <div className="form__error">Wrong password</div>
          <div className="form__field">
            <label htmlFor="fullname" className="form__label">
              Full name
            </label>
            <input
              className="form__input"
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              required
            />
          </div>
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
          <div className="form__field">
            <label htmlFor="confirmpassword" className="form__label">
              Confirm Password
            </label>
            <input
              className="form__input"
              type="password"
              name="confirmpassword"
              placeholder="Repeat your password"
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="position" className="form__label">
              Position
            </label>
            <select className="form__selector">
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Fullstack Developer">Fullstack Developer</option>
            </select>
          </div>
          <button type="submit" className="form__button">
            Create account
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterForm;
