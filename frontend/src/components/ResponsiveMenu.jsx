import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  X,
  Home,
  Music,
  Mic,
  Settings,
  Wrench,
  Gift,
  Info,
} from "lucide-react";
import { categories } from "@/mockData/data";

const ResponsiveMenu = ({ isOpen, onClose }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-4 left-4 right-4 md:top-20 md:left-auto md:right-6 md:w-80 z-50"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                    <p className="text-sm text-gray-500">Chọn danh mục</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-4">
                <motion.ul variants={containerVariants} className="space-y-2">
                  {categories.map((item, index) => (
                    <motion.li
                      key={item.value}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        x: 4,
                        transition: { duration: 0.1 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        href={item.value}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                      >
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors" />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
