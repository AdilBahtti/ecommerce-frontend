import OrderSummaryRow from "../components/OrderSummaryRow";
import StatusBadge from "../components/StatusBadge";
import styles from "./OrderDetail.module.css";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getOrderById } from "../feature/order/orderThunk";

export default function OrderDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedOrder: order, loading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!order) {
    return <h2>Order not found.</h2>;
  }

  return (
    <div className={styles.page}>
      <p className={styles.tag}>Order Detail</p>

      <div className={styles.headerRow}>
        <h1 className={styles.heading}>
          Order #{order._id.slice(-6)}
        </h1>

        <StatusBadge status={order.status} />
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <h2 className={styles.cardHeading}>Items</h2>

          <div className={styles.rows}>
            {order.items.map((item) => (
              <OrderSummaryRow
                key={item._id}
                item={item}
              />
            ))}
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>

            <span className={styles.totalValue}>
              ${Number(order.totalAmount).toFixed(2)}
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardHeading}>Shipping Address</h2>

          <p className={styles.address}>
            {order.shippingAddress}
          </p>
        </div>
      </div>
    </div>
  );
}