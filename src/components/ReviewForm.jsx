import { useState } from 'react';
import styles from './ReviewForm.module.css';
import { useDispatch } from 'react-redux';
import { addReview } from '../feature/product/productThunk';
export default function ReviewForm({id}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
          id,
            rating,
            comment,
        };
        dispatch(addReview({id ,reviewData}));
    };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Poor</option>
          <option value={1}>1 - Bad</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          rows={3}
          placeholder="Share your thoughts on this product"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Submit review
      </button>
    </form>
  );
}