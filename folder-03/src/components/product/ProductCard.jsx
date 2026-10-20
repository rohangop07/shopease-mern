import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="category">{product.category}</p>

        <p className="price">₹{product.price}</p>

        <Link to={`/products/${product._id}`}>
          <button className="buy-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
