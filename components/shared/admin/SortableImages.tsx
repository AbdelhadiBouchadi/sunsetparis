'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { X, GripVertical, Download, Star } from 'lucide-react';

interface SortableImageProps {
  url: string;
  index: number;
  totalImages: number; // Add this prop to calculate correct order
  onRemove: (index: number) => void;
  isThumbnail: boolean;
  onSetThumbnail: () => void;
}

export function SortableImage({
  url,
  index,
  totalImages,
  onRemove,
  isThumbnail,
  onSetThumbnail,
}: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Calculate the correct download order (reverse the index)
  const downloadIndex = totalImages - index;

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `image-${downloadIndex}.${blob.type.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-video bg-black rounded-lg overflow-hidden"
    >
      <Image
        src={url}
        alt={`Image ${downloadIndex}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          onClick={handleDownload}
          className="absolute top-2 right-10 p-2 rounded-full bg-blue-600/80 hover:bg-blue-500 transition-colors"
          type="button"
        >
          <Download className="size-4 text-white" />
        </button>
        <button
          className="absolute top-2 right-2 p-[0.45rem] bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          onClick={() => onRemove(index)}
          type="button"
        >
          <X className="size-4 text-white" />
        </button>
        <button
          onClick={onSetThumbnail}
          className={`absolute top-2 left-2 p-2 rounded-full transition-colors ${
            isThumbnail
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-gray-600/80 hover:bg-gray-500'
          }`}
          type="button"
          title={isThumbnail ? 'Current thumbnail' : 'Set as thumbnail'}
        >
          <Star
            className={`size-4 ${
              isThumbnail ? 'text-white fill-current' : 'text-white'
            }`}
          />
        </button>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
