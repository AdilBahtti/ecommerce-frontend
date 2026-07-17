import { useState } from 'react';
import styles from './Account.module.css';
import {useSelector} from 'react-redux';

const sampleUser = {
  name: 'Jordan Blake',
  email: 'jordan.blake@example.com',
  phone: '+1 555 123 4567',
  address: '48 Ridgeway Lane, Portland, OR 97205',
};

export default function Account() {

  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(sampleUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.tag}>Account</p>
          <h1 className={styles.heading}>Your details</h1>
        </div>

        {!isEditing && (
          <button type="button" className={styles.editBtn} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      <div className={styles.card}>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Full name</label>
            {isEditing ? (
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
              />
            ) : (
              <p className={styles.value}>{form.name}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            {isEditing ? (
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            ) : (
              <p className={styles.value}>{form.email}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">
              Phone <span className={styles.optional}>(optional)</span>
            </label>
            {isEditing ? (
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 555 123 4567"
              />
            ) : (
              <p className={styles.value}>{form.phone || '—'}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="address">
              Address <span className={styles.optional}>(optional)</span>
            </label>
            {isEditing ? (
              <textarea
                id="address"
                name="address"
                rows={2}
                value={form.address}
                onChange={handleChange}
                placeholder="Street, city, postal code"
              />
            ) : (
              <p className={styles.value}>{form.address || '—'}</p>
            )}
          </div>

          {isEditing && (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setForm(sampleUser);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(false);
                }}
              >
                Save changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}