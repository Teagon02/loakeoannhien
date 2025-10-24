import React from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/mockData/data";

// Status options
const statusOptions = [
  { value: "true", label: "Còn hàng" },
  { value: "false", label: "Hết hàng" },
];
import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProductForm = ({
  isOpen,
  onClose,
  editingProduct,
  formValues,
  setFormValues,
  onSubmit,
  handleNewProductAdded = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(formValues.category || "");
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(
    formValues.status ? "true" : "false"
  );

  // Sync value with formValues.category when editing
  useEffect(() => {
    setValue(formValues.category || "");
  }, [formValues.category]);

  // Sync statusValue with formValues.status when editing
  useEffect(() => {
    setStatusValue(formValues.status ? "true" : "false");
  }, [formValues.status]);

  const handleInputChange = (field, newValue) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  // save img to cloudinary
  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];

  //   if (!file) return;

  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "loa-keo-an-nhien");
  //   data.append("cloud_name", "dosj3ixj2");
  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/dosj3ixj2/image/upload",
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   );
  //   const uploadImageUrl = await res.json();
  //   console.log(uploadImageUrl.url);
  //   setFormValues((prev) => ({
  //     ...prev,
  //     images: uploadImageUrl.url,
  //   }));
  // };

  // upload nhiều ảnh lên Cloudinary (unsigned)
  const handleFilesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // chuẩn bị FormData cho từng file
    const uploadOne = async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "loa-keo-an-nhien"); // preset của bạn
      fd.append("cloud_name", "dosj3ixj2"); // cloud của bạn

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dosj3ixj2/image/upload",
        {
          method: "POST",
          body: fd,
        }
      );
      const data = await res.json();
      // Trả về URL an toàn
      return data.secure_url || data.url;
    };

    // Upload song song tất cả file
    const urls = await Promise.all(files.map(uploadOne));

    // Gộp vào state (mảng)
    setFormValues((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...urls],
    }));

    // (optional) reset input nếu muốn chọn lại các ảnh y hệt
    e.target.value = "";
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tên sản phẩm
              </label>
              <Input
                value={formValues.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            {/* Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Giá</label>
                <Input
                  type="number"
                  min="0"
                  value={formValues.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Giảm (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formValues.discount}
                  onChange={(e) =>
                    handleInputChange("discount", e.target.value)
                  }
                />
              </div>
            </div>
            {/* Category picker */}
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? categories.find((category) => category.value === value)
                          ?.label
                      : "Chọn loại sản phẩm"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>Không tìm thấy danh mục.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={(currentValue) => {
                              const newValue =
                                currentValue === value ? "" : currentValue;
                              setValue(newValue);
                              handleInputChange("category", newValue);
                              setOpen(false);
                            }}
                          >
                            {category.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === category.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <Input
                value={formValues.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            {/* Link review */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Link review
              </label>
              <Input
                value={formValues.linkReview}
                onChange={(e) =>
                  handleInputChange("linkReview", e.target.value)
                }
              />
            </div>
            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Trạng thái
              </label>
              <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={statusOpen}
                    className="w-[200px] justify-between"
                  >
                    {statusOptions.find(
                      (status) => status.value === statusValue
                    )?.label || "Chọn trạng thái"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>Không tìm thấy trạng thái.</CommandEmpty>
                      <CommandGroup>
                        {statusOptions.map((status) => (
                          <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(currentValue) => {
                              const selectedStatus = statusOptions.find(
                                (s) => s.value === currentValue
                              );
                              if (selectedStatus) {
                                const newValue = selectedStatus.value;
                                setStatusValue(newValue);
                                handleInputChange(
                                  "status",
                                  newValue === "true"
                                );
                                setStatusOpen(false);
                              }
                            }}
                          >
                            {status.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                statusValue === status.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Ảnh sản phẩm (URLs)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesUpload}
              ></input>
              {Array.isArray(formValues.images) &&
                formValues.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {formValues.images.map((src, i) => (
                      <div key={i} className="relative">
                        <img
                          src={src}
                          alt={`image-${i}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormValues((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, idx) => idx !== i),
                            }))
                          }
                          className="absolute top-1 right-1 text-xs bg-white/80 px-1 rounded"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
          {/* Submit button */}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-1" /> Hủy
            </Button>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onSubmit}
            >
              {editingProduct ? "Lưu" : "Tạo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
