import styles from './ReviewItem.module.css';

export default function ReviewItem({ review }) {
  const { userName, rating, comment } = review;

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <span className={styles.name}>{userName}</span>
        <span className={styles.stars}>
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </span>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
}