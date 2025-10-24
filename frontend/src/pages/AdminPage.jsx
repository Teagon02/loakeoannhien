import React, { useState } from "react";
import { Card } from "../components/ui/card";
import AdminSidebar from "../components/Admin/AdminSidebar";
import ProductsManagement from "../components/Admin/ProductsManagement";
import ProductForm from "../components/Admin/ProductForm";
import {
  useProducts,
  useProductForm,
  useProductPagination,
} from "../hooks/useProducts";
import { toast } from "sonner";

// NOTE: This page is frontend-only. Hook these handlers up to your backend later.

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [query, setQuery] = useState("");

  // Custom hooks
  const { products, setProducts, loading, fetchProducts } = useProducts();
  const {
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
  } = useProductForm();
  const { page, setPage, totalPages, currentPage, pageSlice } =
    useProductPagination(products, query);

  // Product handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formValues,
        price: Number(formValues.price) || 0,
        discount: Number(formValues.discount) || 0,
        status: Boolean(formValues.status),
        images: Array.isArray(formValues.images)
          ? formValues.images
          : String(formValues.images)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
      };

      if (!payload.name || !payload.category) {
        toast.warning("Vui lòng điền đầy đủ tên sản phẩm và danh mục");
        return;
      }

      if (editingProduct) {
        // Update existing product
        const updatedProduct = await updateProduct(editingProduct._id, payload);
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? updatedProduct : p))
        );
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        // Create new product
        const newProduct = await createProduct(payload);
        setProducts((prev) => [newProduct, ...prev]);
        toast.success("Thêm sản phẩm thành công!");
      }

      closeDialog();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi lưu sản phẩm. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(productId);
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Xóa sản phẩm thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        toast.error("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");
      }
    }
  };

  // Placeholder components for tabs to be developed later
  const AccountsManagement = () => (
    <Card className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Quản lý tài khoản
      </h1>
      <p className="text-gray-600">Tính năng đang được phát triển.</p>
    </Card>
  );

  const TransactionsManagement = () => (
    <Card className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Quản lý giao dịch
      </h1>
      <p className="text-gray-600">Tính năng đang được phát triển.</p>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <ProductsManagement
            query={query}
            setQuery={setQuery}
            setPage={setPage}
            loading={loading}
            pageSlice={pageSlice}
            currentPage={currentPage}
            totalPages={totalPages}
            onAdd={openAddDialog}
            onEdit={openEditDialog}
            onDelete={handleDelete}
          />
        );
      case "accounts":
        return <AccountsManagement />;
      case "transactions":
        return <TransactionsManagement />;
      default:
        return (
          <ProductsManagement
            query={query}
            setQuery={setQuery}
            setPage={setPage}
            loading={loading}
            pageSlice={pageSlice}
            currentPage={currentPage}
            totalPages={totalPages}
            onAdd={openAddDialog}
            onEdit={openEditDialog}
            onDelete={handleDelete}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>

      {/* Product Form Dialog */}
      <ProductForm
        isOpen={isDialogOpen}
        onClose={closeDialog}
        editingProduct={editingProduct}
        formValues={formValues}
        setFormValues={setFormValues}
        onSubmit={handleSubmit}
        handleNewProductAdded={() => {
          // State is already updated in handleSubmit, no need to refresh
        }}
      />
    </div>
  );
};

export default AdminPage;
