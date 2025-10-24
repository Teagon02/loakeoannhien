import { categories } from "@/mockData/data";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  return (
    <>
      <nav>
        <div className="container py-4 flex justify-between items-center bg-white rounded-xl border-2">
          {/* Logo */}
          <div>
            <img src="logo.png" alt="logo" className="w-20 h-20" />
          </div>
          {/* Menu section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              <li>
                <a className="inline-block py-1 px-3 hover:text-white font-semibold hover:bg-primary rounded-xl">
                  Trang chủ
                </a>
                {/* </li>
              {categories.map((item) => (
                <li key={item.value}>
                  <a
                    href={item.value}
                    className="inline-block py-1 px-3 hover:text-white font-semibold hover:bg-primary rounded-xl"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li> */}
                <a className="inline-block py-1 px-3 hover:text-white font-semibold hover:bg-primary rounded-xl">
                  Giới thiệu
                </a>
              </li>
            </ul>
          </div>
          {/* Icon section */}
          {/* <div>
            <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
              <CiSearch className="" />
            </button>
          </div> */}
          {/* Mobile hamburger menu */}
          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar section */}
      <ResponsiveMenu isOpen={isOpen} onClose={handleCloseMenu} />
    </>
  );
};

export default Header;
