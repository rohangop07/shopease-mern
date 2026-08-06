import Product from "../models/Product.js";

//create product
export const createProduct = async (req, res) => {
    try{
        //get data from request body
        const { name, description, price , category, image, stock} = req.body;
    
        //validate required fields
        if (!name || ! description || !price || !category || !image){
            return res.status(400).json({
                success :false,
                meassage : "please fill all required fields",
            });
        }
        //create product
        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock,
        });
        //send response
        res.status(201).json({
            success : true,
            message : "Product created successfully",
            product,
        });
} catch(error) {
    res.status(500).json({
        success : false,
        message : error.message,
    });
}
};

////second stage
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//search product
export const searchProducts = async(req, res) => {
  try{
    const {keyword} = req.query;

    const products = await Product.find({
      name:{
        $regex:keyword,
        $options:"i",
      },
    });

    res.status(200).json({
      success: true,
      products,
    });

    res.status(200).json({
      success: true,
      products,
    });

  } catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






///third stage
// Get Single Product
export const getProductById = async (req, res) => {
  try {
    // Get id from URL
    const { id } = req.params;

    // Find product by id
    const product = await Product.findById(id);

    // If product doesn't exist
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Send product
    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Filter Products by Category
export const filterProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const products = await Product.find({
      category,
    });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try{
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);


    if(!product){
      return res.status(404).json({
        success: false,
        message:"Product not found ",
      });
    }

    res.status(200).json({
      success : true,
      message: "Product deleted successfully",
    });

  }catch (error){
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};