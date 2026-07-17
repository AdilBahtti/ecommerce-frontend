import styles from './Register.module.css';
import {useState} from 'react';
import {registerUser} from '../feature/auth/auththunk';
import{useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
     navigate('/login');
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

          <p className={styles.tag}>New account &mdash; parcel intake</p>
          <h1 className={styles.headline}>Open your account.</h1>
          <p className={styles.sub}>Fill in your details to start ordering.</p>

          <form className={styles.form} onSubmit={handleSubmit} >
            <div className={styles.field}>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" value={userData.name} onChange={handleInputChange} placeholder="Jordan Blake" />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={userData.email} onChange={handleInputChange} placeholder="you@example.com" />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password} onChange={handleInputChange}
                  placeholder="At least 6 characters"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
              
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">
                Phone <span className={styles.optional}>(optional)</span>
              </label>
              <input id="phone" name="phone" type="tel" value={userData.phone} onChange={handleInputChange} placeholder="+1 555 123 4567" />
            </div>

            <div className={styles.field}>
              <label htmlFor="address">
                Address <span className={styles.optional}>(optional)</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows={2}
                placeholder="Street, city, postal code"
                value={userData.address} onChange={handleInputChange}
              />
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Create account
            </button>
          </form>

          <p className={styles.switchText}>
            Already have an account?{' '}
            <a href="/login" className={styles.linkBtn}>
              Sign in
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