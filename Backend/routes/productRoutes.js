import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  searchProducts,
  filterProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

import Product from "../models/Product.js";


const router = express.Router();

//create Product
router.post("/", createProduct);

router.get("/", getAllProducts);

router.get("/search", searchProducts);

router.get("/filter", filterProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);



export default router;