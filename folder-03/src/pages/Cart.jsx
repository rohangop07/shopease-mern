import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";



function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeItem } =
    useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const navigate = useNavigate();
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} width="100" />

            <div>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "10px 0",
                }}
              >
                <button onClick={() => decreaseQty(item._id)}>-</button>

                <span>{item.qty}</span>

                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>

              <p>Subtotal: ₹{item.price * item.qty}</p>
            </div>
            <button
              onClick={() => removeItem(item._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              Remove
            </button>

            <button onClick={() => navigate("/checkout")}>
  Proceed to Checkout
</button>
          </div>
        ))
      )}
      <hr />

      <h2>Total: ₹{totalPrice}</h2>
    </div>
  );
}

export default Cart;
