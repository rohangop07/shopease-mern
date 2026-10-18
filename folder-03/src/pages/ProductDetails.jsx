import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import Loader from "../components/common/Loader";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/₹{id}`);

      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <Loader/>
  }

  
  return (
    <div>
      <h1>{product.name}</h1>

      <img src={product.image} alt={product.name} width="300" />

      <h2>₹{product.price}</h2>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>{product.description}</p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
