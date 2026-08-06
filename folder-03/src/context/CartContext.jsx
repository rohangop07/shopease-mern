

import {createContext, useEffect, useState} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

  // Add to Cart
  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  // Increase Quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    );

    setCartItems(updatedCart);
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter((item) => item.qty > 0);

    setCartItems(updatedCart);
  };

  // Remove Product
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;