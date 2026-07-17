import { useState, useEffect } from 'react';
import ProductGallery from '../components/ProductGallery';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import styles from './ProductDetail.module.css';
import { useParams } from 'react-router-dom';
import { getProductById } from '../feature/product/productThunk';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart } from '../feature/cart/cartThunk';
import { useNavigate } from 'react-router-dom';

const sampleProduct = {
  reviews: [
    { id: 'r1', userName: 'Alina R.', rating: 5, comment: 'Beautiful pour and even easier to clean.' },
    { id: 'r2', userName: 'Devon M.', rating: 4, comment: 'Great quality, wish it came in more colors.' },
  ],
};

export default function ProductDetail() {
     const navigate = useNavigate();
    const productDetails = useSelector((state) => state.product.productDetails);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]); // depend on id so navigating to a different product refetches

  if (!productDetails) {
    return <div className={styles.page}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <ProductGallery images={productDetails.image} title={productDetails.title} />

        <div className={styles.info}>
          <span className={styles.category}>{productDetails.categoryName}</span>
          <h1 className={styles.title}>{productDetails.title}</h1>
          <p className={styles.price}>${productDetails.price?.toFixed(2)}</p>
          <p className={styles.description}>{productDetails.description}</p>

          <div className={styles.quantityRow}>
            <span className={styles.quantityLabel}>Quantity</span>
            <div className={styles.stepper}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button type="button"   onClick={async() =>{ await dispatch(addToCart(id));    navigate('/layout/cart')  
        }
          } className={styles.addToCartBtn}>
            Add to cart
          </button>
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.reviewsHeading}>Reviews</h2>
        <ReviewList reviews={productDetails.reviews} />
        <ReviewForm id={id} />
      </div>
    </div>
  );
}