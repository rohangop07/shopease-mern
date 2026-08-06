import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?search=${keyword}`);
    }
  };

  const [menuOpen, setMenuOpen] = usestate(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ShopEase</Link>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        <Link to="/products">Products</Link>

        {user && <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>}

        {!user ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        ) : (
          <>
            <span className="welcome-user">Hello, {user.name}</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
