import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { productDetailData } from "@/mockData/data";
import { useNavigate } from "react-router-dom";

const ProductList = ({ filteredProducts }) => {
  let filter = "default";
  const navigate = useNavigate();

  const handleViewDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4">
      {filteredProducts.map((product, index) => (
        <Card
          key={product.id || index}
          className="w-full h-auto p-2 sm:p-5 bg-white text-gray-700 shadow-lg rounded-xl overflow-hidden flex flex-col justify-between"
        >
          <img
            className="w-full object-cover rounded-xl transition-transform hover:scale-105"
            src={product.images[0]}
            alt={product.name}
          />
          <div className="p-1 flex flex-col sm:gap-2">
            {/* product name */}
            <h2 className="flex justify-center items-center text-center font-semibold text-sm sm:text-base leading-tight min-h-[40px]">
              {product.name}
            </h2>

            {/* Product price */}
            <div>
              <span className="flex justify-center text-xs sm:text-sm font-bold text-red-400">
                {new Intl.NumberFormat("vi-VN").format(
                  product.price - (product.price * product.discount) / 100
                )}
                đ
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-center">
              {product.discount > 0 && (
                <span className="text-xs line-through opacity-50">
                  {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white">
                  -{product.discount}%
                </span>
              )}
            </div>
            {/* Product action button */}
            <div className="mt-1 flex justify-center gap-1">
              <Button
                onClick={() => handleViewDetail(product._id)}
                className="bg-yellow-500/80 hover:bg-yellow-500/90 px-2 sm:px-3 py-1 rounded-md text-white font-medium text-xs tracking-wider transition-transform hover:scale-105"
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
