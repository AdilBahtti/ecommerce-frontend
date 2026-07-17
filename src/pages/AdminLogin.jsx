import styles from './AdminLogin.module.css';
import {loginUser} from '../feature/auth/auththunk';
import {useDispatch} from 'react-redux';

import { useState } from 'react';

export default function AdminLogin() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  



   
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Admin sign in</h1>
        <p className={styles.sub}>Restricted access. Authorized staff only.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@yonder.com" />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign in
          </button>
        </form>
      </div>

      <p className={styles.footerNote}>Yonder Admin Panel</p>
    </div>
  );
}