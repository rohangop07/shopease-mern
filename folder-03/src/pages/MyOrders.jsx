
import { useEffect, useState } from "react";
import api from "../services/api";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/orders/my", {
        headers: {
          Authorization: token,
        },
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  return (
    <div className="my-orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>View your order history and details.</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No Orders Yet</h3>
          <p>Your placed orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-top">
                <div>
                  <h3>Order ID</h3>
                  <p className="order-id">{order._id}</p>
                </div>

                <span
                  className={`order-status ${String(order.status || "pending").toLowerCase()}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="order-total">
                <span>Total Amount</span>
                <strong>₹{formatPrice(order.totalPrice)}</strong>
              </div>

              <div className="order-products">
                <h3>Ordered Products</h3>

                {order.products.map((item) => (
                  <div className="order-product" key={item._id}>
                    <div>
                      <strong>
                        {item.product?.name || "Product unavailable"}
                      </strong>
                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <span>
                      ₹{formatPrice(item.product?.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
