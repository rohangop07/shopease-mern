import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    
  <BrowserRouter>
  <CartProvider>
    <React.StrictMode>
  <App />
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        borderRadius: "12px",
        background: "#1e293b",
        color: "#fff",
      },
    }}
  />
</React.StrictMode>
    </CartProvider>
  </BrowserRouter>
  </AuthProvider>
  
);