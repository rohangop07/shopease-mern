import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shopease-mern-three.vercel.app/"
 ],
    credentials: true,
  })
);



app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

//test route
app.get("/",(req , res) =>  {
    res.send("server is running...");
});




export default app;