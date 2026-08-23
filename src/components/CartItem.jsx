import styles from './CartItem.module.css';
import { mediaUrl } from '../api/apiClient';

export default function CartItem({ item, onIncrease, onRemove }) {
  return (
    <div className={styles.row}>
      <div className={styles.imageWrap}>
        <img src={mediaUrl(item.product.image?.[0] ?? item.product.image)} alt={item.product.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{item.product.title}</p>
        <p className={styles.price}>${item.product.price}</p>
      </div>

      <div className={styles.stepper}>
        <button type="button" onClick={() => onIncrease(item.product._id)} aria-label="Add one more">
          +
        </button>
        <span>{item.quantity}</span>
      </div>

      <p className={styles.lineTotal}>${(item.product.price * item.quantity).toFixed(2)}</p>

      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => onRemove(item.product._id)}
        aria-label={`Remove ${item.product.title} from cart`}
      >
        Remove
      </button>
    </div>
  );
}