import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      if (response.ok) {
        setPost(data);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch post');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = () => {
    fetchPost(); // Refresh the post to show the new comment
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4">
        {error}
        <Link to="/" className="btn btn-secondary ms-3">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Link to="/" className="btn btn-secondary mb-3">Back to Posts</Link>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text text-muted">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="card-text">{post.content}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3>Comments ({post.comments.length})</h3>
        <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
        
        {post.comments.length === 0 ? (
          <p className="text-muted mt-3">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="mt-3">
            {post.comments.map(comment => (
              <div key={comment._id} className="card mb-2">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">{comment.author}</h6>
                  <p className="card-text">{comment.content}</p>
                  <small className="text-muted">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
