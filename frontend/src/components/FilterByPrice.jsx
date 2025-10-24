import { filterSorts } from "@/mockData/data";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

const FilterByPrice = ({ sort = "default", onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selected = filterSorts.find((s) => s.value === sort);

  return (
    <div className="flex items-center bg-amber-300/30 h-auto p-2 space-y-2">
      {/* Filter */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between mr-2"
          >
            {selected ? selected.label : "Sắp xếp"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No filterSort found.</CommandEmpty>
              <CommandGroup>
                {filterSorts.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(val) => {
                      // nếu chọn lại đúng option đang chọn thì về "default"
                      const next = val === sort ? "default" : val;
                      onChange?.(next); // 👈 báo cho HomePage
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        sort === opt.value ? "opacity-100" : "opacity-0"
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
  );
};

export default FilterByPrice;
