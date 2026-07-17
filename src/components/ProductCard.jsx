import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
const API_BASE = 'http://localhost:5000';

export default function ProductCard({ product }) {
  const { _id, title, price, image } = product;
  const imageUrl = image?.[0] ? `${API_BASE}/${image[0]}` : '/placeholder.png';

  return (
    <Link to={`/layout/shop/${_id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}