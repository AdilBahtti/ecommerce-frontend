import { useState, useEffect } from 'react';
import OrderSummaryRow from '../components/OrderSummaryRow';
import styles from './Checkout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../feature/order/orderThunk';
import { getallCartItems } from '../feature/cart/cartThunk';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items) || [];
  const [shippingAddress, setShippingAddress] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    dispatch(getallCartItems());
  }, [dispatch]);

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      alert('Please enter a shipping address.');
      return;
    }
    const result = await dispatch(placeOrder({ cartItems, shippingAddress , totalAmount }));
    if (result.payload?._id) {
      navigate(`/layout/checkout/${result.payload._id}`);
    }
  };

  return (
    <div className={styles.page}>
      <p className={styles.tag}>Checkout</p>
      <h1 className={styles.heading}>Review and place your order</h1>

      <div className={styles.layout}>
        <div className={styles.formCol}>
          <div className={styles.card}>
            <h2 className={styles.cardHeading}>Shipping address</h2>
            <div className={styles.field}>
              <label htmlFor="shippingAddress">Deliver to</label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                rows={3}
                placeholder="Street, city, state, postal code"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.summaryCol}>
          <div className={styles.card}>
            <h2 className={styles.cardHeading}>Order summary</h2>

            <div className={styles.rows}>
              {cartItems.map((item) => (
                <OrderSummaryRow key={item.product._id} item={item} />
              ))}
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalValue}>${totalAmount.toFixed(2)}</span>
            </div>

            <button onClick={handlePlaceOrder} type="button" className={styles.placeOrderBtn}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}