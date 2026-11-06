
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import Loader from "../components/common/Loader";
import { CartContext } from "../context/CartContext";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/products/${id}`);

        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
        setError("Unable to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className="product-error">
        <h2>{error || "Product not found"}</h2>
        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  const isOutOfStock = Number(product.stock) <= 0;

  return (
    <div className="product-details-page">

      <div className="product-breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span>/</span>
        <span onClick={() => navigate("/products")}>Products</span>
        <span>/</span>
        <span className="current-page">{product.name}</span>
      </div>

      <div className="product-details-container">

        {/* Product Image */}

        <div className="product-image-section">
          <div className="product-image-box">
            <img
              src={product.image}
              alt={product.name}
              className="product-main-image"
            />
          </div>
        </div>

        {/* Product Information */}

        <div className="product-info-section">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="product-detail-price">
            {formatPrice(product.price)}
          </div>

          <div className="product-stock">
            <span className={isOutOfStock ? "stock-out" : "stock-available"}>
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>

            {!isOutOfStock && (
              <span className="stock-count">
                ({product.stock} available)
              </span>
            )}
          </div>

          <hr />

          <div className="product-description">
            <h3>Product Description</h3>
            <p>
              {product.description || "No description available."}
            </p>
          </div>

          <div className="product-detail-actions">

            <button
              className="detail-add-cart-btn"
              disabled={isOutOfStock}
              onClick={() => addToCart(product)}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              className="detail-continue-btn"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>

          </div>

          <div className="product-extra-info">
            <p>✓ Quality Products</p>
            <p>✓ Secure Shopping</p>
            <p>✓ Easy Shopping Experience</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
