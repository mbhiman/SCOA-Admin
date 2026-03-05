"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  ChevronUp, ChevronDown, ChevronsUpDown,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Search, Download, SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  title,
  description,
  actions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize: 10 } },
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      {(title || actions || searchKey) && (
        <div
          className="flex items-center justify-between gap-4 px-5 py-4 border-b flex-wrap"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {searchKey && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm"
                style={{ background: "var(--muted)", borderColor: "var(--border)" }}
              >
                <Search className="w-3.5 h-3.5" style={{ color: "var(--muted-foreground)" }} />
                <input
                  className="bg-transparent outline-none w-48"
                  style={{ color: "var(--foreground)" }}
                  placeholder={searchPlaceholder}
                  value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                  onChange={(e) =>
                    table.getColumn(searchKey)?.setFilterValue(e.target.value)
                  }
                />
              </div>
            )}
            {selectedCount > 0 && (
              <span className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                {selectedCount} selected
              </span>
            )}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium hover:bg-[var(--muted)] transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium hover:bg-[var(--muted)] transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            {actions}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left"
                    style={{ color: "var(--muted-foreground)", background: "var(--muted)" }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-1 text-xs font-semibold uppercase tracking-wide select-none",
                          header.column.getCanSort() && "cursor-pointer hover:text-[var(--foreground)]"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronsUpDown className="w-3 h-3 opacity-40" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{
                    borderBottom: i < table.getRowModel().rows.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3" style={{ color: "var(--foreground)" }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-16 text-center text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between px-5 py-3 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </p>
        <div className="flex items-center gap-1">
          {[
            { icon: ChevronsLeft, action: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage() },
            { icon: ChevronLeft, action: () => table.previousPage(), disabled: !table.getCanPreviousPage() },
            { icon: ChevronRight, action: () => table.nextPage(), disabled: !table.getCanNextPage() },
            { icon: ChevronsRight, action: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage() },
          ].map(({ icon: Icon, action, disabled }, i) => (
            <button
              key={i}
              onClick={action}
              disabled={disabled}
              className="w-7 h-7 flex items-center justify-center rounded border transition-colors disabled:opacity-40 hover:bg-[var(--muted)]"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
