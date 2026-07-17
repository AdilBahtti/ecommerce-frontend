import { Link } from 'react-router-dom';
import styles from './AdminProducts.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts , deleteProduct } from '../feature/product/productThunk';
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../feature/category/categoryThunk';
const sampleProducts = [
  { id: 'p1', title: 'Ceramic pour-over set', price: 38, category: 'Kitchen' },
  { id: 'p2', title: 'Linen table runner', price: 24, category: 'Home' },
  { id: 'p3', title: 'Brass desk lamp', price: 64, category: 'Home' },
  { id: 'p4', title: 'Recycled notebook set', price: 16, category: 'Stationery' },
];

export default function AdminProducts() {

  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    }, []);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Products</h1>
        <Link to="/adminlayout/products/new" className={styles.addBtn}>
          Add product
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.category.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td className={styles.actionsCell}>
                <Link to={`/adminlayout/products/${product._id}/edit`} className={styles.editLink}>
                  Edit
                </Link>
                <button onClick={async () => { 
                  await dispatch(deleteProduct(product._id));
                  dispatch(getAllProducts());
                }} type="button" className={styles.deleteBtn}>
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