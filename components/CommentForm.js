import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment content is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: author.trim() || 'Anonymous',
          content: content.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthor('');
        setContent('');
        onCommentAdded();
      } else {
        setError(data.message || 'Failed to add comment');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add a Comment</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Name (optional)</label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name (optional)"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Comment</label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Your comment..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
