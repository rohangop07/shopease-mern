
import {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

function CartProvider({ children }) {

  // Get logged-in user
  const { user } = useContext(AuthContext);

  // Get unique user ID
  const userId = user?._id || user?.id || null;

  // Separate storage for every user
  const storageKey = userId
    ? `cart_${userId}`
    : "cart_guest";

  const [cartItems, setCartItems] = useState([]);

  const [loadedKey, setLoadedKey] = useState(null);

  // Load the correct user's cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(storageKey);

      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    }

    setLoadedKey(storageKey);

  }, [storageKey]);

  // Save cart only after the correct user's cart is loaded
  useEffect(() => {
    if (loadedKey !== storageKey) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Error saving cart:", error);
    }

  }, [cartItems, storageKey, loadedKey]);

  // Add to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          qty: 1,
        },
      ];
    });
  };

  // Increase Quantity
  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove Product
  const removeItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
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
