'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Search, Users, Shield, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [permissionFilter, setPermissionFilter] = React.useState<string>('all');
  const [filteredData, setFilteredData] = React.useState(data);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Filter data based on permission level
  React.useEffect(() => {
    let filtered = data;

    if (permissionFilter !== 'all') {
      filtered = data.filter((user: any) => {
        switch (permissionFilter) {
          case 'admin':
            return user.isAdmin === true;
          case 'vip':
            return user.canViewHiddenArtists === true && user.isAdmin === false;
          case 'standard':
            return (
              user.isAdmin === false && user.canViewHiddenArtists === false
            );
          default:
            return true;
        }
      });
    }

    setFilteredData(filtered);
  }, [permissionFilter, data]);

  // Get stats for the header
  const totalUsers = filteredData.length;
  const adminUsers = filteredData.filter((user: any) => user.isAdmin).length;
  const vipUsers = filteredData.filter(
    (user: any) => user.canViewHiddenArtists && !user.isAdmin
  ).length;
  const standardUsers = totalUsers - adminUsers - vipUsers;

  return (
    <div className="w-full space-y-4 p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border px-4 py-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-green-700 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-700" />
            <span className="text-sm font-medium">Total Users</span>
          </div>
          <div className="text-2xl font-bold">{totalUsers}</div>
        </div>
        <div className="rounded-lg border px-4 py-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-green-700 transition-all duration-300 cursor-pointer group ">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-700" />
            <span className="text-sm font-medium">Administrators</span>
          </div>
          <div className="text-2xl font-bold">{adminUsers}</div>
        </div>
        <div className="rounded-lg border px-4 py-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-green-700 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-green-700" />
            <span className="text-sm font-medium">VIP Access</span>
          </div>
          <div className="text-2xl font-bold">{vipUsers}</div>
        </div>
        <div className="rounded-lg border px-4 py-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-green-700 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-700" />
            <span className="text-sm font-medium">Standard Users</span>
          </div>
          <div className="text-2xl font-bold">{standardUsers}</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={permissionFilter} onValueChange={setPermissionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by permission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="admin">Administrators</SelectItem>
              <SelectItem value="vip">VIP Access</SelectItem>
              <SelectItem value="standard">Standard Users</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md">
        <Table className="shad-table">
          <TableHeader className="bg-dark-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="shad-table-row-header">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="shad-table-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
