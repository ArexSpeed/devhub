import { useState, useRef } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { uploadImage } from 'services/uploadImage';

const BlogAdd = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const blogForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleImagePreview = (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    setImagePreview(url);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(blogForm.current);
    const payload = {
      userid: session.user.id,
      username: session.user.name,
      userimage: session.user.image,
      image: imagePreview,
      title: form.get('title'),
      category: form.get('category'),
      excerpt: form.get('excerpt'),
      content: form.get('content')
    };

    if (form.get('image').name !== '') {
      const picture = form.get('image');
      const file = await uploadImage(picture);
      payload.image = file.secure_url;
    }

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setFormProcessing(false);
      router.push('/blog');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  }

  if (loading) {
    return <div className="form">Loading...</div>;
  }

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
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
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
