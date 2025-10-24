import React from "react";
import { NavbarMenu } from "@/mockData/data";

const NavbarCategory = () => {
  return (
    <div className="hidden md:block">
      <ul className="flex items-center gap-6 text-gray-600">
        {NavbarMenu.map((item) => (
          <li key={item.id}>
            <a
              href={item.link}
              className="inline-block py-1 px-3 hover:text-primary font-semibold"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarCategory;
