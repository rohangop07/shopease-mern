import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminDashboard.css";
import adminImage from "../assets/images123.jpg";

import toast from "react-hot-toast";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/products/₹{id}`);

      toast.success(response.data.message);

      getProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}

      <div className="sidebar">
        <div>
          <div className="logo-section">
            <h1>Welcome Back, Admin 👋</h1>
<p>Manage products and customer orders efficiently.</p>
          </div>

          <ul className="menu">
            <li>
              <Link to="/admin">📊 Dashboard</Link>
            </li>
            <li>
              <Link to="/products">📦 Products</Link>
            </li>
            <li>
              <Link to="/admin/orders">🛒 Orders</Link>
            </li>
            <li>
              <Link to="/">🏠 Home</Link>
            </li>

            <li
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              style={{ cursor: "pointer" }}
            >
              🚪 Logout
            </li>
          </ul>
        </div>

        <div className="profile">
          <img src={adminImage} alt="admin" />

          <h3>Rohan</h3>

          <p>Administrator</p>
        </div>
      </div>

      {/* Right Side */}

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>

            <p>Welcome back 👋 Manage your products efficiently.</p>
          </div>

          <button className="add-btn" onClick={() => navigate("/admin/add")}>
            + Add Product
          </button>
        </div>

        {/* Stats */}

        <div className="stats">
          <div className="stat-card">
            <h3>📦 Products</h3>
            <h2>{products.length}</h2>
          </div>

          <div className="stat-card">
            <h3>📂 Categories</h3>
            <h2>{[...new Set(products.map((p) => p.category))].length}</h2>
          </div>

          <div className="stat-card">
            <h3>💰 Total Stock</h3>
            <h2>{products.reduce((sum, p) => sum + Number(p.stock), 0)}</h2>
          </div>
        </div>

        {/* Search */}

        <div className="search-box">
          <input type="text" placeholder="Search Products..." />
        </div>

        {/* Product Table */}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>

                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/edit/₹{product._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
