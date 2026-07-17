import { useParams, useNavigate } from 'react-router-dom';
import styles from './AdminProductForm.module.css';


import { useState ,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct ,updateProduct } from '../feature/product/productThunk';
import {useSelector} from 'react-redux';
const sampleCategories = [
  { id: 'cat1', name: 'Kitchen' },
  { id: 'cat2', name: 'Home' },
  { id: 'cat3', name: 'Stationery' },
  { id: 'cat4', name: 'Outdoors' },
];





export default function AdminProductForm() {

  const categories = useSelector((state) => state.category.categories);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
   const [formData, setFormData] = useState({
     title: '',
     description: '',
  price: '',
  category: '',
  image: null,
});
const dispatch = useDispatch();
     const esisingProduct = useSelector((state) => state.product.products.find((p) => p._id === id));


     useEffect(() => {
       if (isEditMode && esisingProduct) {
         setFormData({
            title: esisingProduct.title,
            description: esisingProduct.description,
            price: esisingProduct.price,
            category: esisingProduct.category._id,

            
          });
        }
      }, [isEditMode, esisingProduct]);



const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setFormData((prev) => ({
      ...prev,
      image: files,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();

  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("category", formData.category);

  for (let i = 0; i < formData.image.length; i++) {
    data.append("image", formData.image[i]);
  }
   if (isEditMode) {
    
    dispatch(updateProduct({ id, productData: data }));
  } else {
  dispatch(addProduct(data));
  }
   navigate('/adminlayout/products');
};



  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>{isEditMode ? 'Edit product' : 'Add product'}</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={formData.title} onChange={handleChange} type="text" placeholder="Ceramic pour-over set" />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="price">Price</label>
            <input id="price" name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" placeholder="0.00" />
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="image">Image URLs</label>
          <input
            id="image"
            name="image"
            type="file"
            multiple
            onChange={handleChange}
          />
        </div>

        <div className={styles.actions}>
          <button
          onClick={() => navigate('/adminlayout/products')}
            type="button"
            className={styles.cancelBtn}

          >
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            {isEditMode ? 'Save changes' : 'Add product'}
          </button>
        </div>
      </form>
    </div>
  );
}