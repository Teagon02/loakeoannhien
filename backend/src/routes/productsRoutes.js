import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (không cần authentication)
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (chỉ admin mới được truy cập)
router.use(protectedRoute);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
