import { Link } from 'react-router-dom';
import styles from './AdminCategories.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategories, deleteCategory } from '../feature/category/categoryThunk';
const sampleCategories = [
  { id: 'cat1', name: 'Kitchen' },
  { id: 'cat2', name: 'Home' },
  { id: 'cat3', name: 'Stationery' },
  { id: 'cat4', name: 'Outdoors' },
];

export default function AdminCategories() {

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Categories</h1>
        <Link to="/adminlayout/categories/new" className={styles.addBtn}>
          Add category
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td className={styles.actionsCell}>
                <Link to={`/adminlayout/categories/${category._id}/edit`} className={styles.editLink}>
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    await dispatch(deleteCategory(category._id));
                    dispatch(getAllCategories());
                  }}
                  type="button"
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}