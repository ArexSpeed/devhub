import React from 'react';
import TitleBox from './TitleBox';
import { session } from 'next-auth/client';
import BlogCommentCards from './BlogCommentCards';
function BlogComment() {
  return (
    <section className="blog__comment_section">
      <div className="blog__comment_top">
        <span className="blog_comment_title"></span>
        <TitleBox title="Comments" button="Add new comment" href="#" session={session} />
      </div>
      <div className="blog__comment_add">
        <form>
          <textarea className="blog__textarea" name="comment" form="usrform">
            Enter text here...
          </textarea>
        </form>
      </div>
      <BlogCommentCards />
    </section>
  );
}

export default BlogComment;
