import { ListFilter, Columns3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuickActionProps {
  table: Table<any>;
  entity: string;
}

export default function QuickAction({ table, entity }: QuickActionProps) {
  const [position, setPosition] = useState<string>("");
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filters, setFilters] = useState({
    ageRange: [0, 200] as [number, number],
    labelNames: [] as string[],
    alphabeticFilter: "",
    contactStatus: "",
  });

  // Fetch unique label values dynamically
  useEffect(() => {
    const labelColumn = table.getColumn("labels");
    const statusColumn = table.getColumn("contactStatus");

    if (labelColumn) {
      const uniqueLabelValues = labelColumn.getFacetedUniqueValues();
      // @ts-ignore
      const arraysOfLabelArrays = [...uniqueLabelValues.keys()];
      const labelArray = arraysOfLabelArrays
        .flat()
        .filter((item) => item && item.name)
        .map((item) => item.name);
      const labelColors = arraysOfLabelArrays
        .flat()
        .filter((item) => item && item.name)
        .map((item) => {
          return {
            name: item.name,
            color: item.color,
          };
        });
      setAvailableLabels(labelArray);
    }

    // if (statusColumn) {
    //   const uniqueStatusValues = statusColumn.getFacetedUniqueValues();
    //   setAvailableStatuses([...uniqueStatusValues.keys()]);
    // }
  }, [table]);

  // Handle Global Search
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      table.setGlobalFilter(e.target.value);
    },
    [table]
  );

  // Handle Age Filter Change
  const handleAgeRangeChange = useCallback(
    (minAge: number, maxAge: number) => {
      setFilters((prev) => ({
        ...prev,
        ageRange: [minAge, maxAge],
      }));
      table.getColumn("age")?.setFilterValue([minAge, maxAge]);
    },
    [table]
  );

  // Handle Label Filter Change
  const handleLabelChange = useCallback(
    (selectedLabels: string[]) => {
      setFilters((prev) => ({
        ...prev,
        labelNames: selectedLabels,
      }));
      table.getColumn("labels")?.setFilterValue(selectedLabels);
    },
    [table]
  );

  // Handle Alphabetic Name Filter Change
  const handleAlphabeticFilterChange = useCallback(
    (letter: string) => {
      setFilters((prev) => ({
        ...prev,
        alphabeticFilter: letter,
      }));
      table.getColumn("fullName")?.setFilterValue(letter);
    },
    [table]
  );

  // Handle Contact Status Filter Change
  const handleContactStatusChange = useCallback(
    (status: string) => {
      setFilters((prev) => ({
        ...prev,
        contactStatus: status,
      }));
      table.getColumn("contactStatus")?.setFilterValue(status);
    },
    [table]
  );

  return (
    <div className="flex flex-col w-full justify-between mt-6 mb-4 space-y-1 lg:my-8 lg:flex-row lg:space-y-0">
      <h1 id="all-entities" className="text-lg font-semibold text-gray-800">
        {table.getFilteredRowModel().rows?.length}{" "}
        {table.getFilteredRowModel().rows?.length > 1
          ? entity
          : entity.slice(0, -1)}
      </h1>
      <div className="flex gap-5 justify-between items-center lg:justify-normal w-full lg:w-fit text-lg text-gray-500">
        {/* Global Search UI */}
        <Input
          placeholder="Search By Name"
          className="w-52 bg-slate-50 focus-visible:ring-1 focus-visible:ring-mainLight"
          value={filters.alphabeticFilter}
          onChange={(e) => handleAlphabeticFilterChange(e.target.value)}
        />
        <div className="flex gap-4  text-lg text-gray-500">
          {/* Filter Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2">
                <ListFilter size={16} />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="max-w-lg p-4 shadow-lg shadow-main/10"
              align="start">
              <DropdownMenuLabel>Advanced Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>By Age</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <div className="space-y-2">
                        <DropdownMenuLabel>Age Range</DropdownMenuLabel>

                        <div className="flex lg:space-x-2 px-2 flex-col lg:flex-row">
                          <div className="space-y-1">
                            <h4 className="text-textDark text-sm">Min</h4>
                            <Input
                              type="number"
                              value={filters.ageRange[0]}
                              onChange={(e) =>
                                handleAgeRangeChange(
                                  Number(e.target.value),
                                  filters.ageRange[1]
                                )
                              }
                              placeholder="Min Age"
                            />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-textDark text-sm">Max</h4>
                            <Input
                              type="number"
                              value={filters.ageRange[1]}
                              onChange={(e) =>
                                handleAgeRangeChange(
                                  filters.ageRange[0],
                                  Number(e.target.value)
                                )
                              }
                              placeholder="Max Age"
                            />
                          </div>
                        </div>
                      </div>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              {/* Label Filter */}
              <div className="mt-3">
                <Select
                  defaultValue={selectedLabel}
                  onValueChange={(e) => {
                    setSelectedLabel(e);
                    handleLabelChange([e]);
                  }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter By Label" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Labels Available</SelectLabel>
                      {availableLabels.map((label: string) => (
                        <SelectItem key={label} value={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Status Filter */}
              <DropdownMenuItem
                className="w-full flex justify-center bg-main rounded-md mt-3 text-white"
                onClick={() => {
                  setSelectedLabel("");
                  table.resetColumnFilters(true);
                }}>
                Clear Fliters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Columns UI */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2">
                <Columns3 size={16} />
                Columns
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 shadow-lg shadow-main/10">
              <DropdownMenuLabel>Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      table.getColumn(column.id)?.toggleVisibility(!!value)
                    }>
                    {column.columnDef.header as React.ReactNode}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
