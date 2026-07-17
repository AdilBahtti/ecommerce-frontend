import { Link } from "react-router-dom";
import styles from "./AdminOrders.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllOrders } from "../feature/order/orderThunk";

const statusStyles = {
  pending: styles.pending,
  completed: styles.completed,
  cancelled: styles.cancelled,
};

export default function AdminOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { orders = [], loading, error } = useSelector(
    (state) => state.order
  );

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Orders</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>

                <td>
                  {order.user?.username ||
                    order.user?.name ||
                    "Unknown User"}
                </td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                <td>${Number(order.totalAmount).toFixed(2)}</td>

                <td>
                  <span
                    className={`${styles.badge} ${
                      statusStyles[order.status] || ""
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/adminlayout/orders/${order._id}`}
                    className={styles.viewLink}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}