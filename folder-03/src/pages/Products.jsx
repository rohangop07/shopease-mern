import { useEffect, useState } from "react";
import api from "../services/api";

import "./Products.css";

import { useLocation } from "react-router-dom";

import ProductCard from "../components/product/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const keyword = searchParams.get("search");
  useEffect(() => {
    getProducts();
  }, [keyword]);

  const getProducts = async () => {
    try {
      const url = keyword ? `/products/search?keyword=₹{keyword}` : "/products";

      const response = await api.get(url);

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-page">
      <h1 className="products-title">All Products</h1>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
