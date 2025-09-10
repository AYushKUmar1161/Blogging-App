import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return <div className="text-center mt-4">No posts yet. Be the first to create one!</div>;
  }

  return (
    <div className="mt-4">
      <h2>Recent Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">
              {post.content.length > 100 
                ? `${post.content.substring(0, 100)}...` 
                : post.content}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/post/${post._id}`} className="btn btn-primary">
                Read More
              </Link>
              <small className="text-muted">
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
