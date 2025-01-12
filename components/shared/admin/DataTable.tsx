'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableTableRow } from './DraggableTableRow';
import { updateProject } from '@/lib/actions/project.actions';
import { toast } from 'sonner';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'order', desc: false },
  ]);
  const [projects, setProjects] = useState(data);

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
        pageSize: 24,
      },
    },
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p: any) => p._id === active.id);
    const newIndex = projects.findIndex((p: any) => p._id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newProjects = [...projects];
    const [movedProject] = newProjects.splice(oldIndex, 1);
    newProjects.splice(newIndex, 0, movedProject);

    // Update order numbers
    const updatedProjects = newProjects.map((project: any, index: number) => ({
      ...project,
      order: index + 1,
    }));

    setProjects(updatedProjects as TData[]);

    // Update the moved project in the database
    try {
      const projectToUpdate = updatedProjects[newIndex];
      await updateProject(projectToUpdate._id, projectToUpdate, oldIndex + 1);
      toast.success('Project order updated successfully');
    } catch (error) {
      console.error('Error updating project order:', error);
      toast.error('Failed to update project order');
      // Revert the state on error
      setProjects(data);
    }
  };

  return (
    <div className="data-table">
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
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={projects.map((p: any) => p._id)}
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
