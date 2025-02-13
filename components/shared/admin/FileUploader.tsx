'use client';

import {
  useCallback,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
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
import { Loader2 } from 'lucide-react';

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  thumbnailIndex?: number;
  onThumbnailChange?: (index: number) => void;
};

const compressImage = async (file: File): Promise<File> => {
  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Create an image element
    const img = new Image();
    img.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Calculate new dimensions (max 2000px while maintaining aspect ratio)
    let width = img.width;
    let height = img.height;
    const maxDimension = 2000;

    if (width > maxDimension || height > maxDimension) {
      if (width > height) {
        height = (height / width) * maxDimension;
        width = maxDimension;
      } else {
        width = (width / height) * maxDimension;
        height = maxDimension;
      }
    }

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Draw and compress image
    ctx.drawImage(img, 0, 0, width, height);

    // Convert to blob with reduced quality
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob as Blob),
        'image/webp',
        0.8 // 80% quality
      );
    });

    // Clean up
    URL.revokeObjectURL(img.src);

    // Create new file
    return new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
      type: 'image/webp',
    });
  } catch (error) {
    console.error('Image compression failed:', error);
    return file; // Return original file if compression fails
  }
};

export function FileUploader({
  imageUrls = [],
  onFieldChange,
  setFiles,
  thumbnailIndex = 0,
  onThumbnailChange,
}: FileUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [localImageUrls, setLocalImageUrls] = useState<string[]>(imageUrls);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // Update local state when imageUrls prop changes
  useEffect(() => {
    setLocalImageUrls(imageUrls);
  }, [imageUrls]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsProcessing(true);
      try {
        // Compress images before upload
        const compressedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            if (!file.type.startsWith('image/')) return file;
            return await compressImage(file);
          })
        );

        // Add new files to the newFiles state
        setNewFiles((prev) => [...prev, ...compressedFiles]);

        // Only set the new files for upload
        setFiles(compressedFiles);

        // Generate URLs for new files
        const newImageUrls = compressedFiles.map((file) =>
          convertFileToUrl(file)
        );

        // Combine existing URLs with new ones
        const updatedImageUrls = [...localImageUrls, ...newImageUrls];
        setLocalImageUrls(updatedImageUrls);
        onFieldChange(updatedImageUrls);
      } catch (error) {
        console.error('Error processing images:', error);
      } finally {
        setIsProcessing(false);
      }
    },
    [localImageUrls, onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
    multiple: true,
  });

  const removeImage = (index: number) => {
    const newImageUrls = [...localImageUrls];
    const removedUrl = newImageUrls.splice(index, 1)[0];
    setLocalImageUrls(newImageUrls);
    onFieldChange(newImageUrls);

    // Only remove from newFiles if it's a newly added file
    if (newFiles.some((file) => convertFileToUrl(file) === removedUrl)) {
      setNewFiles((prev) =>
        prev.filter((file) => convertFileToUrl(file) !== removedUrl)
      );
      setFiles((prev) =>
        prev.filter((file) => convertFileToUrl(file) !== removedUrl)
      );
    }

    if (index === thumbnailIndex && onThumbnailChange) {
      onThumbnailChange(0);
    } else if (index < thumbnailIndex && onThumbnailChange) {
      onThumbnailChange(thumbnailIndex - 1);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localImageUrls.indexOf(active.id.toString());
      const newIndex = localImageUrls.indexOf(over.id.toString());

      const newOrder = arrayMove(localImageUrls, oldIndex, newIndex);
      setLocalImageUrls(newOrder);
      onFieldChange(newOrder);

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
        className={`flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border cursor-pointer flex-col rounded-xl h-72 transition-all duration-200 ${
          isDragActive ? 'border-[#FB65A4] bg-opacity-60' : ''
        }`}
      >
        <input {...getInputProps()} className="cursor-pointer" />
        <div className="flex flex-col justify-center items-center py-5 text-grey-500">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-10 w-10 animate-spin text-[#FB65A4]" />
              <p>Processing images...</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {localImageUrls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localImageUrls}
              strategy={rectSortingStrategy}
            >
              {localImageUrls.map((url, index) => (
                <SortableImage
                  key={url}
                  url={url}
                  index={index}
                  totalImages={localImageUrls.length}
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
