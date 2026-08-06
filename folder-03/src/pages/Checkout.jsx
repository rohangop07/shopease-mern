import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast"

import api from "../services/api";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
  (sum, item) => sum + Number(item.price) * item.qty,
  0
);
  const placeOrder = async () => {
    try {
      setLoading(true);

     const products = cartItems.map((item) => ({
  product: item._id,
  quantity: item.qty,
}));

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/orders",
        {
          products,
          totalPrice,
          paymentMethod: "Cash on Delivery",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);

      setCartItems([]);

      localStorage.removeItem("cart");

      navigate("/my-orders");
    }
     catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  toast.error(error.response?.data?.message || "order failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Checkout</h1>

      <h3>User</h3>
      <p>{user?.name}</p>
      <p>{user?.email}</p>

      <hr />

      <h3>Products</h3>

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <h4>{item.name}</h4>

          <p>Price: ₹{item.price}</p>

          <p>Quantity: {item.qty}</p>
        </div>
      ))}

      <h2>Total: ₹{totalPrice}</h2>

      <h3>Payment Method</h3>

      <p>Cash on Delivery</p>

      <button
        onClick={placeOrder}
        disabled={loading}
        style={{
          padding: "12px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;