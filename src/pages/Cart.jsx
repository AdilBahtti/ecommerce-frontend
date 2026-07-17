import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import styles from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getallCartItems } from '../feature/cart/cartThunk';
import { updateCartItemQuantity } from '../feature/cart/cartThunk'; // Import the update thunk
// import { removeCartItem } from '../feature/cart/cartThunk'; // if you have a remove thunk
import { removeCartItem } from '../feature/cart/cartThunk'; // Import the remove thunk
import {placeOrder} from '../feature/order/orderThunk';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallCartItems());
  }, [dispatch]);


   const handleIncrease =  async (id) => {
   await  dispatch(updateCartItemQuantity(id));
     dispatch(getallCartItems()); // Refresh the cart items after updating quantity
  }
  const cartItems = useSelector((state) => state.cart.items) || [];

  const handleRemove = (id) => {
    // dispatch(removeCartItem(id)); // wire this up to your actual remove thunk/action
    dispatch(removeCartItem(id)); // wire this up to your actual remove thunk/action
    dispatch(getallCartItems()); // Refresh the cart items after removing an item
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Browse the shop to find something you'll love."
        actionLabel="Continue shopping"
        onAction={() => navigate('/')}
      />
    );
  }
  

  return (
    <div className={styles.page}>
      <p className={styles.tag}>Cart</p>
      <h1 className={styles.heading}>Your cart</h1>

      <div className={styles.list}>
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} onIncrease={handleIncrease}  onRemove={handleRemove} />
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.subtotalRow}>
          <span>Subtotal</span>
          <span className={styles.subtotalValue}>${subtotal.toFixed(2)}</span>
        </div>
        <p className={styles.note}>Shipping and taxes calculated at checkout.</p>
        <button
          type="button"
          className={styles.checkoutBtn}
          onClick={async() =>{
            
          
            navigate('/layout/checkout')}}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}