import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import {logout} from '../feature/auth/authSlice';
import {useDispatch} from 'react-redux';

import { useNavigate } from 'react-router-dom';
export default function Header() {
    const dispatch = useDispatch();
   
   const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.wordmark}>
          Yonder
        </Link>

        <nav className={styles.nav}>
          <Link to="/layout/shop" className={styles.navLink}>
            Shop
          </Link>
        
        </nav>

        <div className={styles.searchBox}>
          <input type="text" placeholder="Search products" />
        </div>

        <div className={styles.actions}>
          <Link to="/layout/cart" className={styles.iconBtn} aria-label="Cart">
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path
                d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" />
            </svg>
            <span className={styles.badge}>2</span>
          </Link>

          <Link to="/layout/account" className={styles.iconBtn} aria-label="Account">
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M5 19c1.2-3.2 4-4.8 7-4.8s5.8 1.6 7 4.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          <button type="button" onClick={() => {dispatch(logout());  navigate('/login' , { replace: true })}} className={styles.logoutBtn}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}