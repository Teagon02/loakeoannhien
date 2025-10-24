import React from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { categories, filterSorts } from "@/mockData/data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const ProductTable = ({
  products,
  loading,
  pageSlice,
  currentPage,
  totalPages,
  setPage,
  onEdit,
  onDelete,
}) => {
  const getCategoryLabel = (value) => {
    const found = categories.find((c) => c.value === value);
    return found ? found.label : value; // fallback
  };
  if (loading) {
    return (
      <tr>
        <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
          Đang tải...
        </td>
      </tr>
    );
  }

  if (pageSlice.length === 0) {
    return (
      <tr>
        <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
          Không có sản phẩm
        </td>
      </tr>
    );
  }

  return (
    <>
      {pageSlice.map((p) => (
        <tr key={p._id} className="hover:bg-gray-50">
          <td className="px-4 py-3">
            <img
              src={(Array.isArray(p.images) && p.images[0]) || "product.jpg"}
              alt={p.name}
              className="h-12 w-12 rounded object-cover"
            />
          </td>
          <td className="px-4 py-3">
            <div className="font-medium text-gray-900 line-clamp-1">
              {p.name}
            </div>
            <div className="text-xs text-gray-500 line-clamp-1">
              {p.description}
            </div>
          </td>
          <td className="px-4 py-3 text-gray-700">
            {getCategoryLabel(p.category)}
          </td>
          <td className="px-4 py-3 text-gray-900 font-semibold">
            {new Intl.NumberFormat("vi-VN").format(p.price)}đ
          </td>
          <td className="px-4 py-3 text-gray-700">{p.discount}%</td>
          <td className="px-4 py-3">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                p.status
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {p.status ? "Còn hàng" : "Hết hàng"}
            </span>
          </td>
          <td className="px-4 py-3 text-right whitespace-nowrap">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => onEdit(p)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="destructive" onClick={() => onDelete(p._id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

const ProductsManagement = ({
  query,
  setQuery,
  setPage,
  loading,
  pageSlice,
  currentPage,
  totalPages,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản trị sản phẩm</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo tên, danh mục, mô tả..."
              className="pl-8 w-64"
            />
          </div>
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Thêm sản phẩm
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giảm
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <ProductTable
                products={[]}
                loading={loading}
                pageSlice={pageSlice}
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </tbody>
          </table>
        </div>
        <div className="p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                />
              </PaginationItem>
              {/* Numeric page buttons */}
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === currentPage}
                      size="default"
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default ProductsManagement;
