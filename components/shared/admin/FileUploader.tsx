'use client';

import { useCallback, Dispatch, SetStateAction } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { Button } from '@/components/ui/button';
import { convertFileToUrl } from '@/lib/utils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableImage } from './SortableImages';

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  thumbnailIndex?: number;
  onThumbnailChange?: (index: number) => void;
};

export function FileUploader({
  imageUrls = [],
  onFieldChange,
  setFiles,
  thumbnailIndex = 0,
  onThumbnailChange,
}: FileUploaderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      const newImageUrls = acceptedFiles.map((file) => convertFileToUrl(file));
      // Add new images to the beginning of the array
      onFieldChange([...newImageUrls, ...imageUrls]);
    },
    [imageUrls, onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
    multiple: true,
  });

  const removeImage = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    onFieldChange(newImageUrls);

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });

    // Update thumbnail index if needed
    if (index === thumbnailIndex && onThumbnailChange) {
      onThumbnailChange(0);
    } else if (index < thumbnailIndex && onThumbnailChange) {
      onThumbnailChange(thumbnailIndex - 1);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = imageUrls.indexOf(active.id.toString());
      const newIndex = imageUrls.indexOf(over.id.toString());

      const newOrder = arrayMove(imageUrls, oldIndex, newIndex);
      onFieldChange(newOrder);

      // Update thumbnail index if needed
      if (oldIndex === thumbnailIndex && onThumbnailChange) {
        onThumbnailChange(newIndex);
      } else if (
        oldIndex < thumbnailIndex &&
        newIndex >= thumbnailIndex &&
        onThumbnailChange
      ) {
        onThumbnailChange(thumbnailIndex - 1);
      } else if (
        oldIndex > thumbnailIndex &&
        newIndex <= thumbnailIndex &&
        onThumbnailChange
      ) {
        onThumbnailChange(thumbnailIndex + 1);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        {...getRootProps()}
        className="flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border cursor-pointer flex-col rounded-xl h-72"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        <div className="flex flex-col justify-center items-center py-5 text-grey-500">
          <img
            src="/assets/icons/file-upload.svg"
            width={77}
            height={77}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2">Drag & Drop Photo Here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button
            type="button"
            className="rounded-full shad-primary-btn hover:bg-green-400"
          >
            Select From Device
          </Button>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={imageUrls} strategy={rectSortingStrategy}>
              {imageUrls.map((url, index) => (
                <SortableImage
                  key={url}
                  url={url}
                  index={index}
                  totalImages={imageUrls.length}
                  onRemove={removeImage}
                  isThumbnail={index === thumbnailIndex}
                  onSetThumbnail={() => onThumbnailChange?.(index)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
