
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    closeMenu();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      closeMenu();
      navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          ShopEase
        </Link>
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

      <button
        type="button"
        className="menu-btn"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/products" onClick={closeMenu}>
          Products
        </Link>

        {user && (
          <Link to="/cart" onClick={closeMenu}>
            Cart
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/register" onClick={closeMenu}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="welcome-user">
              Hello, {user.name}
            </span>

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
