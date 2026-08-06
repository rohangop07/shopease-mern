import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setFormData(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, formData);

      toast.success("product Updated successfully");

      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "update Failed");
    }
  };


return (
  <div style={{ padding: "30px" }}>
    <h1>Edit Product</h1>

    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
      />
      <br></br>

      <input
        name="description"
        placeholder="description"
        value={formData.description}
        onChange={handleChange}
      />
      <br></br>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <br></br>

      <input
        name="category"
        placeholder="category"
        value={formData.category}
        onChange={handleChange}
      />

      <br></br>

      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <br></br>

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
      />

      <br></br>

      <button type ="submit">
Update Product
      </button>
    </form>
  </div>
);
}

export default EditProduct;