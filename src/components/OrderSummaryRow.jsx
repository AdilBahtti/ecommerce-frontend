import styles from './OrderSummaryRow.module.css';

export default function OrderSummaryRow({ item }) {


  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <p className={styles.title}>{item.product.title}</p>
        <p className={styles.qty}>Qty {item.quantity}</p>
      </div>
      <p className={styles.lineTotal}>${(item.product.price * item.quantity).toFixed(2)}</p>
    </div>
  );
}