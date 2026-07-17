import styles from './Login.module.css';
import {useState} from 'react';
import {loginUser} from '../feature/auth/auththunk';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <span className={styles.wordmark}>Yonder</span>
        <span className={styles.est}>EST. 2026</span>
      </header>

      <main className={styles.stage}>
        <div className={styles.card}>
          <div className={styles.stamp}>
            <span>Y</span>
          </div>

          <p className={styles.tag}>Returning customer &mdash; parcel pickup</p>
          <h1 className={styles.headline}>Welcome back.</h1>
          <p className={styles.sub}>Sign in to continue where you left off.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={loginData.email} onChange={handleInputChange} placeholder="you@example.com" />
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <a href="/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>

            <label className={styles.checkboxRow}>
              <input type="checkbox" name="remember" />
              <span>Keep me signed in</span>
            </label>

            <button type="submit" className={styles.primaryBtn}>
              Sign in
            </button>
          </form>

          <p className={styles.switchText}>
            New to Yonder?{' '}
            <a href="/register" className={styles.linkBtn}>
              Create an account
            </a>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Shipped daily, no minimum order.</span>
      </footer>
    </div>
  );
}