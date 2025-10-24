import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-md border border-gray-200 w-full max-w-md">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-2 rounded-xl p-2 focus:border-blue-200 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-100 text-2xl hover:bg-blue-200 hover:text-blue-500 rounded-full p-2 duration-200"
        >
          <CiSearch />
        </button>
        {searchTerm && (
          <button
            onClick={handleClear}
            className="bg-red-100 text-red-500 hover:bg-red-200 rounded-full p-2 duration-200 text-sm"
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
