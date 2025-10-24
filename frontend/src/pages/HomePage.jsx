import Banner from "@/components/Banner";
import FilterByPrice from "@/components/FilterByPrice";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import PaginationProduct from "@/components/PaginationProduct";
import Search from "@/components/Search";
import CategoryFilter from "@/components/CategoryFilter";
// import NavbarCategory from "@/components/NavbarCategory"; // nếu dùng thì mở
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { visibleProductLimit } from "@/mockData/data";
import api from "@/lib/axios";
import { useProductPagination } from "@/hooks/useProducts";

const HomePage = () => {
  const [productBuffer, setProductBuffer] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 👇 Thêm state sort: "default" | "asc" | "desc"
  const [sort, setSort] = useState("default");

  // Gọi API theo sort hiện tại
  const fetchProducts = async (filter = sort) => {
    try {
      // API backend của bạn: /products?filters=<asc|desc|default>
      const res = await api.get(`/products?filters=${filter}`);
      // BE bạn đang trả về mảng [], nếu sau này trả {items} thì đổi res.data.items
      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      setProductBuffer(items);
      setPage(1); // reset trang khi đổi sort
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy sản phẩm", error);
      toast.error("Lỗi xảy ra khi lấy sản phẩm");
    }
  };

  // Lần đầu load: lấy mặc định
  useEffect(() => {
    fetchProducts("default");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mỗi khi sort đổi -> refetch
  useEffect(() => {
    fetchProducts(sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  // Sử dụng hook tìm kiếm và phân trang
  const {
    page: searchPage,
    setPage: setSearchPage,
    filtered,
    totalPages,
    currentPage,
    pageSlice,
  } = useProductPagination(productBuffer, searchQuery, selectedCategory);

  // Reset trang khi tìm kiếm thay đổi
  useEffect(() => {
    setSearchPage(1);
  }, [searchQuery, setSearchPage]);

  // Reset trang khi category thay đổi
  useEffect(() => {
    setSearchPage(1);
  }, [selectedCategory, setSearchPage]);

  // Sử dụng kết quả từ hook search/category hoặc fallback về logic cũ
  const visibleProducts =
    searchQuery || selectedCategory !== "all"
      ? pageSlice
      : productBuffer.slice(
          (page - 1) * visibleProductLimit,
          page * visibleProductLimit
        );

  const totalPagesDisplay =
    searchQuery || selectedCategory !== "all"
      ? totalPages
      : Math.ceil(productBuffer.length / visibleProductLimit) || 1;
  const currentPageDisplay =
    searchQuery || selectedCategory !== "all" ? currentPage : page;

  const handleNext = () => {
    if (searchQuery || selectedCategory !== "all") {
      setSearchPage(Math.min(currentPage + 1, totalPages));
    } else {
      page < totalPagesDisplay && setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (searchQuery || selectedCategory !== "all") {
      setSearchPage(Math.max(currentPage - 1, 1));
    } else {
      page > 1 && setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    if (searchQuery || selectedCategory !== "all") {
      setSearchPage(newPage);
    } else {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white relative text-gray-800">
      <div className="overflow-x-hidden relative z-10 mx-auto max-w-6xl px-3 sm:px-6 space-y-6">
        {/* Đầu trang */}
        {/* <Header /> */}

        {/* Banner */}
        <Banner />

        {/* Tìm kiếm */}
        <Search onSearch={setSearchQuery} />

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Filter (truyền sort & handler) */}
        <FilterByPrice sort={sort} onChange={setSort} />

        {/* Product */}
        <ProductList filteredProducts={visibleProducts} />

        {/* Pagination */}
        <PaginationProduct
          handleNext={handleNext}
          handlePrev={handlePrev}
          handlePageChange={handlePageChange}
          page={currentPageDisplay}
          totalPages={totalPagesDisplay}
        />

        {/* <NavbarCategory /> nếu cần */}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
