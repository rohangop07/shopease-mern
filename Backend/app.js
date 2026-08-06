import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

const app = express();

//middlewares
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://shopease-mern-three.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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