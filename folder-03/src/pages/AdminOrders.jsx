import { useEffect, useState } from "react";
import api from "../services/api";

import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/orders", {
        headers: {
          Authorization: token,
        },
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/₹{id}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#facc15";

      case "Processing":
        return "#3b82f6";

      case "Shipped":
        return "#8b5cf6";

      case "Delivered":
        return "#22c55e";

      default:
        return "#94a3b8";
    }
  };

  return (
    <div className="admin-orders">
      <h1>Admin Orders</h1>

      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.name}</td>

              <td>₹{order.totalPrice}</td>

              <td>
                <span
                  style={{
                    background: getStatusColor(order.status),
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  {order.status}
                </span>
              </td>

              <td>{order.paymentMethod}</td>

              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
