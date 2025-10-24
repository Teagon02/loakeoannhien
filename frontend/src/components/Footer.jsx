import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Clock,
  Youtube,
  YoutubeIcon,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-300 text-black mt-20">
      {/* Main Footer Content */}
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                <h3 className="text-xl font-bold text-black">
                  Loa kéo An Nhiên
                </h3>
              </div>
              <p className="text-black text-sm leading-relaxed">
                Chuyên độ chế loa kéo theo yêu cầu.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/youtubevlog1993"
                  className="text-black hover:text-yellow-400 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@youtubevlog1993?_t=ZS-90kzih0Hw6K&_r=1"
                  className="text-black hover:text-yellow-400 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@Vlog1993/featured"
                  className="text-black hover:text-yellow-400 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/groups/335792308542117"
                  className="text-black bg-amber-200 transition-colors duration-300 border-2 border-red-500 rounded-md px-4 py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bấm vào đây để tham gia vào nhóm mua bán loa kéo.
                </a>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-black bg-amber-200 transition-colors duration-300 border-2 border-red-500 rounded-md px-4 py-2 hover:bg-amber-300"
                >
                  Đăng nhập (chỉ cho ADMIN)
                </button>
              </div>
            </div>

            {/* Quick Links */}
            {/* <div className="space-y-4">
              <h4 className="text-lg font-semibold text-black">
                Liên kết nhanh
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-black hover:text-white transition-colors duration-300 text-sm"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black hover:text-white transition-colors duration-300 text-sm"
                  >
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black hover:text-white transition-colors duration-300 text-sm"
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black hover:text-white transition-colors duration-300 text-sm"
                  >
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div> */}

            {/* Product Categories */}
            {/* <div className="space-y-4">
              <h4 className="text-lg font-semibold text-black">Danh mục</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-black hover:text-white transition-colors duration-300 text-sm"
                  >
                    Loa kéo gia đình
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black hover:text-white transition-colors duration-300 text-sm"
                  >
                    Loa kéo sự kiện
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black hover:text-white transition-colors duration-300 text-sm"
                  >
                    Loa kéo mini
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Phụ kiện âm thanh
                  </a>
                </li>
              </ul>
            </div> */}

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-black">
                Thông tin liên hệ
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-yellow-400" />
                  <span className="text-black text-sm">0937 639 663</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  <span className="text-black text-sm">
                    loakeoanhien@gmail.com
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-yellow-400 mt-1" />
                  <span className="text-black text-sm">
                    Ấp 4, phường Tân Triều, tỉnh Đồng Nai
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-black text-sm">
                    8:00 - 20:00 (T2-CN)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
