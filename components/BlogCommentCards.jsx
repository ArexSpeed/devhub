import React from 'react';

export default function BlogCommentCards() {
  return (
    <div className="blog__comment">
      <div className="blog__author">
        <img
          alt=""
          className="blog__author_img"
          src="https://res.cloudinary.com/dbpsxmtcb/image/upload/v1649140830/x3s5994ypradxjsd5ksm.jpg"
        />
      </div>
      <div className="blog__content">
        <span className="blog__content_user">User Name</span>
        <span className="blog__content_time">3 hours ago</span>
        <span className="blog__content_text">
          The process of UX involves acquiring data while implementing aspects of branding, design,
          and function, with the integration of a product.
        </span>
      </div>
    </div>
  );
}
