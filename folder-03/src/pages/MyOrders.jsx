import { useEffect, useState } from "react";
import api from "../services/api";

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

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>Order ID</h3>
            <p>{order._id}</p>

            <h4>Status</h4>
            <p>{order.status}</p>

            <h4>Total</h4>
            <p>₹{order.totalPrice}</p>

            <h4>Products</h4>

            {order.products.map((item) => (
              <div key={item._id} style={{ marginBottom: "10px" }}>
                <strong>{item.product?.name}</strong>

                <p>Quantity: {item.quantity}</p>

                <p>Price: ₹{item.product?.price}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;