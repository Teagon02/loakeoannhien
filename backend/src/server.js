import express from "express";
import productsRoutes from "./routes/productsRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5002;

const app = express();

// middleware để cho phép các domain khác truy cập vào API
app.use(express.json());
app.use(cookieParser());

// CORS middleware - phải đặt trước các routes
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// public route
app.use("/api/auth", authRoute);

// public products routes (không cần authentication)
app.use("/api/products", productsRoutes);

// private route (chỉ admin)
app.use(protectedRoute);
app.use("/api/users", userRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server dang chay tren cong ${PORT}`);
  });
});
