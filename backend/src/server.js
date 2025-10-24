import express from "express";
import productsRoutes from "./routes/productsRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

// middleware để cho phép các domain khác truy cập vào API
app.use(express.json());
app.use(cookieParser());

// CORS middleware - phải đặt trước các routes
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5001"],
      credentials: true,
    })
  );
}
// public routes (không cần authentication)
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoutes);

// private routes (cần authentication)
app.use("/api/users", protectedRoute, userRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server dang chay tren cong ${PORT}`);
  });
});
