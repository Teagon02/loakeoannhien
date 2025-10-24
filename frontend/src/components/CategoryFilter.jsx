import React from "react";
import { Button } from "./ui/button";
import { categories } from "@/mockData/data";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className="text-sm"
      >
        Tất cả
      </Button>
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          onClick={() => onCategoryChange(category.value)}
          className="text-sm"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
