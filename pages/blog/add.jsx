import React from 'react';
import TitleBox from 'components/TitleBox';
import { PreviewImage } from 'components/Forms/PreviewImage';

export default function add() {
  return (
    <div className="add__container">
      <section className="blog__title">
        <TitleBox title="Adding new post" />
      </section>
      <section className="add__form">
        <div className="form">
          {/* ========TITLE========= */}
          <div className="form__header">Title</div>
          <div className="form__field">
            <label htmlFor="title" className="form__label">
              Title
            </label>
            <input
              className="form__input"
              type="text"
              name="title"
              placeholder="Enter new title"
              required
            />
          </div>
          {/* ========Category========= */}
          <div className="form__header">Category</div>
          <div className="form__field">
            <label htmlFor="category" className="form__label">
              Category
            </label>
            <input
              className="form__input"
              type="text"
              name="category"
              placeholder="Enter new Category"
              required
            />
          </div>
          {/* ========Excerpt========= */}
          <div className="form__header">Excerpt</div>
          <div className="form__field">
            <label htmlFor="excerpt" className="form__label">
              Excerpt
            </label>
            <input
              className="form__input"
              type="text"
              name="excerpt"
              placeholder="Enter new Excerpt"
              required
            />
          </div>
          {/* ========Content========= */}
          <div className="form__header">Content</div>
          <div className="form__field">
            <label htmlFor="content" className="form__label">
              Content
            </label>
            <input
              className="form__input"
              type="text"
              name="content"
              placeholder="Enter new content"
              required
            />
          </div>
          {/* ========Image========= */}
          <PreviewImage />
          <div className="blog__buttons">
            <button className="form__button">Submit</button>
          </div>
        </div>
      </section>
    </div>
  );
}
