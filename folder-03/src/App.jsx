import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import AdminOrders from "./pages/AdminOrders";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/AdminDashboard";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";


import MyOrders from "./pages/MyOrders";

import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />



       


          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        {/* pages without Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/orders" element={<AdminOrders />} /> 

            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>} />

           <Route path="/admin/edit/:id" element={
            <AdminRoute>
              <EditProduct />
              </AdminRoute>} />
           <Route path="/admin/add" element={
            <AdminRoute>
              <AddProduct />
              </AdminRoute>} />
           
       <Route path="/my-orders" element={<MyOrders />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
