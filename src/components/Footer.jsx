import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerCol}>
          <span className={styles.wordmark}>Yonder</span>
          <p className={styles.footerText}>Everyday goods, from everywhere.</p>
        </div>

        <div className={styles.footerCol}>
          <span className={styles.footerHeading}>Shop</span>
          <Link to="/" className={styles.footerLink}>
            All products
          </Link>
          <Link to="/categories" className={styles.footerLink}>
            Categories
          </Link>
        </div>

        <div className={styles.footerCol}>
          <span className={styles.footerHeading}>Account</span>
          <Link to="/account" className={styles.footerLink}>
            My account
          </Link>
          <Link to="/cart" className={styles.footerLink}>
            My cart
          </Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>Shipped daily, no minimum order.</span>
      </div>
    </footer>
  );
}