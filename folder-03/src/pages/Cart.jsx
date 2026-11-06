
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Format price in Indian Rupees
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} products in your cart</p>
      </div>

      {cartItems.length === 0 ? (

        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven't added anything yet.</p>

          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>

      ) : (

        <div className="cart-layout">

          {/* Cart Products */}
          <div className="cart-products">

            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-product-image"
                />

                <div className="cart-product-info">

                  <h3>{item.name}</h3>

                  <p className="cart-price">
                    {formatPrice(item.price)}
                  </p>

                  <div className="quantity-control">

                    <button
                      onClick={() => decreaseQty(item._id)}
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>

                  </div>

                  <p className="item-subtotal">
                    Subtotal: {formatPrice(item.price * item.qty)}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Products</span>
              <span>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total Amount</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="continue-btn"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;
