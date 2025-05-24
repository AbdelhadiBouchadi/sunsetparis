'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Row,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import Image from 'next/image';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableTableRow } from './DraggableTableRow';
import { updateProjectsOrder } from '@/lib/actions/project.actions';
import { toast } from 'sonner';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Initialize with empty sorting to prevent initial sort issues
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'order', desc: false },
  ]);
  const [projects, setProjects] = useState(data);
  const [isDragging, setIsDragging] = useState(false);

  const table = useReactTable({
    data: projects as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 48,
      },
    },
  });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    // Get the actual row data from the table's rows
    const rows = table.getRowModel().rows;

    // Find visual indices (from the sorted/filtered table view)
    const activeRowIndex = rows.findIndex(
      (row) => (row.original as any)._id === active.id
    );
    const overRowIndex = rows.findIndex(
      (row) => (row.original as any)._id === over.id
    );

    if (activeRowIndex === -1 || overRowIndex === -1) return;

    // Create a new array based on the VISUAL order (what the user sees)
    const orderedData = rows.map((row) => row.original);

    // Move the item in the visually ordered array
    const newOrderedData = [...orderedData];
    const [movedItem] = newOrderedData.splice(activeRowIndex, 1);
    newOrderedData.splice(overRowIndex, 0, movedItem);

    // Update order values sequentially based on new positions
    const updatedProjects = newOrderedData.map((project, index) => ({
      ...project,
      order: index + 1,
    }));

    // Optimistically update UI
    setProjects(updatedProjects as TData[]);

    try {
      // Use the existing updateProjectsOrder action
      await updateProjectsOrder(
        updatedProjects.map((project) => ({
          _id: (project as any)._id,
          order: project.order,
        }))
      );
      toast.success('Project order updated');
    } catch (error) {
      console.error('Failed to update orders:', error);
      toast.error('Failed to update project order');
      setProjects(data); // Revert on error
    }
  };

  return (
    <div className={`data-table ${isDragging ? 'cursor-grabbing' : ''}`}>
      <div className="mb-4 p-2 bg-zinc-800 rounded text-zinc-300 text-sm">
        <p>Drag projects to reorder them. Changes are saved automatically.</p>
      </div>
      <Table className="shad-table">
        <TableHeader className="bg-dark-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="shad-table-row-header">
              <th className="w-[40px]"></th>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={table
                .getRowModel()
                .rows.map((row) => (row.original as any)._id)}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <DraggableTableRow
                      key={row.id}
                      row={row}
                      project={row.original as any}
                    />
                  ))
              ) : (
                <TableRow>
                  <td colSpan={columns.length + 1} className="h-24 text-center">
                    No Content Yet.
                  </td>
                </TableRow>
              )}
            </SortableContext>
          </DndContext>
        </TableBody>
      </Table>
      <div className="table-actions flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="shad-gray-btn"
          >
            <Image
              src="/assets/icons/arrow.svg"
              width={24}
              height={24}
              alt="Previous page"
            />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="shad-gray-btn"
          >
            <Image
              src="/assets/icons/arrow.svg"
              width={24}
              height={24}
              alt="Next page"
              className="rotate-180"
            />
          </Button>
        </div>
        <div className="text-sm text-gray-400">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}
