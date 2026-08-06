import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";




function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };
  const [keyword , setKeyword] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?search=${keyword}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ShopEase</Link>
      </div>

      <div className="search">
        <input type="text" placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} 
        onKeyDown={handleSearch}/>
      </div>


      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {user && <Link to="/cart">Cart</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
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
