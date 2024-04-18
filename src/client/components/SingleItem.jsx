import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../single-items.css'



export default function SingleItem({token}) {
  const { id, userId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('')
  const [comments, setComments] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingReviewText, setEditingReviewText] = useState('');
  

  useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get(`/api/items/${id}`);
        setItem(itemResponse.data);

        const reviewsResponse = await axios.get(`/api/reviews/${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (itemId, e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(`/api/reviews/item/${itemId}`, {
        userId: userId,
        rating: rating,
        reviewText: reviewText
      }, config);
      setReviews([...reviews, response.data]);
      setReviewText('');
      setRating('')
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleEditReview = (reviewId, reviewText) => {
    setEditingReviewId(reviewId);
    setEditingReviewText(reviewText);
  };
  
  const handleEditReviewSubmit = async (reviewId, e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, {
        reviewText: editingReviewText
      });
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            reviewText: editingReviewText
          };
        }
        return review;
      });
      setReviews(updatedReviews, response.data);
      setEditingReviewId(null);
      setEditingReviewText('');
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };
  
  

  const handleCommentSubmit = async (reviewId, e) => {
    console.log("Review ID in handleCommentSubmit:", reviewId)
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

        if (!reviewId) {
            console.error("Review ID is undefined")
            return;
        }
      const response = await axios.post(`/api/comments/review/${reviewId}`, { commentText }, config);
      const updatedReviews = reviews.map(review => {
        if (review.reviewid === reviewId) {
            return {
                ...review,
                comments: [...review.comments, response.data]
            };
        }
        
        return review;
      })
      setReviews(updatedReviews);
      setCommentText('')
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setReviews(reviews.map(review => ({
        ...review,
        comments: review.comments.filter(comment => comment.id !== commentId)
      })));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className='single-items-container'>
      {item && (
        <article key={item.id}>
          <h2>{item.name}</h2>
          <img src={item.picture} alt={item.name} />
          <p>Brand: {item.brand}</p>
          <p>Description: {item.description}</p>
        </article>
      )}
      
      <div className="reviews-comments-container">
  <h3>Reviews</h3>
  <ul>
    {reviews.map(review => (
      <li key={review.id} className='review-item'>
        <p>Rating: {review.rating}</p>
        <p>{review.reviewtext}</p>
        <p>Posted by: {review.username}</p>
        {userId === review.userId && (
          <button onClick={() => handleEditReview(review.id, review.reviewtext)}>Edit Review</button>
        )}
        <h4>Comments</h4>
        <ul key={review.id}>
          {review.comments && review.comments.map(comments => (
            <li key={comments.id} className='comment-item'>
              <p>{comments.commenttext}</p>
              <p>Posted by: {comments.user}</p>
              {userId === comments.userId && (
                <button onClick={() => handleEditComment(comments.id)}>Edit Comment</button>
              )}
              <button onClick={() => handleDelete(comments.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => handleCommentSubmit(review.reviewid, e)}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
          ></textarea>
          <button type="submit">Submit Comment</button>
        </form>
      </li>
    ))}
  </ul>
</div>

{/* Edit Review Form */}
{editingReviewId && (
  <form onSubmit={(e) => handleEditReviewSubmit(editingReviewId, e)}>
    <textarea
      value={editingReviewText}
      onChange={(e) => setEditingReviewText(e.target.value)}
    ></textarea>
    <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
    <button type="submit">Save</button>
  </form>
)}
         {/* Review Submission Form */}
         <form onSubmit={(e) => handleReviewSubmit(id, e)}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Add a review..."
        ></textarea>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}




