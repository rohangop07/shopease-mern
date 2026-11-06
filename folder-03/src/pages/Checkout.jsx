
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import "./Checkout.css";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

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

      // Remove only the current user's saved cart
      const userId = user?._id || user?.id;
      const cartKey = userId ? `cart_${userId}` : "cart_guest";
      localStorage.removeItem(cartKey);

      navigate("/my-orders");

    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Order failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your order before placing it.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products before checkout.</p>
          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      ) : (

        <div className="checkout-layout">

          {/* Left Section */}

          <div className="checkout-left">

            <div className="checkout-card">
              <h2>Customer Information</h2>

              <div className="customer-info">
                <div>
                  <span>Name</span>
                  <strong>{user?.name || "Customer"}</strong>
                </div>

                <div>
                  <span>Email Address</span>
                  <strong>{user?.email || "Not available"}</strong>
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2>Order Items ({totalItems})</h2>

              <div className="checkout-products">
                {cartItems.map((item) => (
                  <div className="checkout-product" key={item._id}>

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="checkout-product-info">
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.qty}</p>
                      <strong>{formatPrice(item.price * item.qty)}</strong>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <div className="checkout-card">
              <h2>Payment Method</h2>

              <div className="payment-method">
                <span className="payment-icon">💵</span>
                <div>
                  <strong>Cash on Delivery</strong>
                  <p>Pay when your order arrives.</p>
                </div>
                <span className="payment-selected">✓</span>
              </div>
            </div>

          </div>

          {/* Right Section */}

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-summary-row">
              <span>Total Products</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <div className="checkout-summary-row">
              <span>Delivery Charges</span>
              <strong>Included</strong>
            </div>

            <hr />

            <div className="checkout-final-total">
              <span>Total Amount</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <button
              className="place-order-btn"
              onClick={placeOrder}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <button
              className="checkout-back-btn"
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </button>

            <p className="checkout-security">
              🔒 Secure Shopping Experience
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default Checkout;
