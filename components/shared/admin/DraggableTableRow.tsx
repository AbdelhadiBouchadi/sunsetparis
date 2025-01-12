import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableRow } from '@/components/ui/table';
import { IProject } from '@/lib/database/models/project.model';
import { flexRender } from '@tanstack/react-table';
import { GripVertical } from 'lucide-react';

interface DraggableTableRowProps {
  row: any;
  project: IProject;
}

export function DraggableTableRow({ row, project }: DraggableTableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={`relative shad-table-row ${
        isDragging ? 'opacity-50 bg-neutral-800' : ''
      }`}
      data-state={row.getIsSelected() && 'selected'}
    >
      <td className="w-[40px] pl-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2"
        >
          <GripVertical className="h-4 w-4 text-neutral-400" />
        </div>
      </td>
      {row.getVisibleCells().map((cell: any) => (
        <td key={cell.id} className="p-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </TableRow>
  );
}
