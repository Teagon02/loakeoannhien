import { useState, useEffect, useMemo } from "react";
import api from "@/lib/axios";
const PAGE_SIZE = 8;

// Hàm loại bỏ dấu tiếng Việt
const removeVietnameseAccents = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/products");
      setProducts(response.data);
    } catch (e) {
      console.error("Lỗi khi tải sản phẩm:", e);
      setError("Không thể tải danh sách sản phẩm");

      // Fallback to empty array if API fails
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, setProducts, loading, error, fetchProducts };
};

export const useProductForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    discount: 0,
    description: "",
    category: "",
    images: [],
    linkReview: "",
    status: true,
  });

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormValues({
      name: "",
      price: "",
      discount: 0,
      description: "",
      category: "",
      images: [],
      linkReview: "",
      status: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormValues({
      name: product.name || "",
      price: product.price || "",
      discount: product.discount || 0,
      description: product.description || "",
      category: product.category || "",
      images: Array.isArray(product.images)
        ? product.images
        : product.images
        ? [product.images]
        : [],
      linkReview: product.linkReview || "",
      status: Boolean(product.status),
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const createProduct = async (productData) => {
    try {
      const response = await api.post("/products", productData);

      const newProduct = response.data;
      return newProduct;
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      throw error;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const response = await api.put(`/products/${productId}`, productData);

      const updatedProduct = response.data;
      return updatedProduct;
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);

      return true;
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      throw error;
    }
  };

  return {
    isDialogOpen,
    editingProduct,
    formValues,
    setFormValues,
    openAddDialog,
    openEditDialog,
    closeDialog,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export const useProductPagination = (products, query, category = "all") => {
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let base = products;

    // Filter by category first
    if (category && category !== "all") {
      base = base.filter((p) => p.category === category);
    }

    // Then filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      base = base.filter((p) => {
        if (!p.name) return false;
        const productName = removeVietnameseAccents(p.name.toLowerCase());
        const searchQuery = removeVietnameseAccents(q);
        return productName.includes(searchQuery);
      });
    }

    return base;
  }, [products, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageSlice = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return { page, setPage, filtered, totalPages, currentPage, pageSlice };
};
