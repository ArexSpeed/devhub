import { useState, useRef } from 'react';

const BlogAdd = () => {
  const blogForm = useRef();
  const [error, setError] = useState();
  //const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleImagePreview = (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    setImagePreview(url);
  };

  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <div className="center">
      <div className="form">
        <div className="form__header">Add new post</div>
        <form onSubmit={handleSubmit} ref={blogForm}>
          {error && <div className="form__error">{error}</div>}
          <div className="form__image">
            <img src={imagePreview} alt="" />
          </div>
          <div className="form__field">
            <label htmlFor="image" className="form__label">
              Image
            </label>
            <input
              className="form__upload"
              type="file"
              name="image"
              id="image"
              onChange={(e) => handleImagePreview(e)}
            />
          </div>
          <div className="form__field">
            <label htmlFor="title" className="form__label">
              Title
            </label>
            <input
              className="form__input"
              type="text"
              name="title"
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="category" className="form__label">
              Category
            </label>
            <select className="form__selector" name="category">
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Fullstack Developer">Fullstack Developer</option>
            </select>
          </div>
          <div className="form__field">
            <label htmlFor="excerpt" className="form__label">
              Excerpt
            </label>
            <textarea
              className="form__textarea"
              name="excerpt"
              placeholder="Write a short description of your post"
            />
          </div>
          <div className="form__field">
            <label htmlFor="content" className="form__label">
              Content
            </label>
            <textarea
              className="form__textarea"
              name="content"
              placeholder="Write your post content"
            />
          </div>
          <button type="submit" className="form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogAdd;
