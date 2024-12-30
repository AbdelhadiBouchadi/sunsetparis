'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { projectFormSchema } from '@/lib/validator';
import { createProject, updateProject } from '@/lib/actions/project.actions';
import { parseVideoUrl } from '@/lib/validator';
import { UseFormReset } from 'react-hook-form';
import { IProjectForm } from '@/types';

interface UseProjectSubmissionProps {
  type: 'Create' | 'Update';
  projectId?: string;
  startUpload: (files: File[]) => Promise<{ url: string }[] | undefined>;
  files: File[];
  project?: any;
  form: {
    reset: UseFormReset<IProjectForm>;
  };
}

export const useProjectSubmission = ({
  type,
  projectId,
  startUpload,
  files,
  project,
  form,
}: UseProjectSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    try {
      setIsLoading(true);

      const toastId = toast.loading(
        type === 'Create' ? 'Creating project...' : 'Updating project...'
      );

      let uploadedImageUrls = values.images || [];

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);

        if (!uploadedImages) {
          toast.error('Failed to upload images');
          return;
        }

        uploadedImageUrls = uploadedImages.map((img) => img.url);
      }

      if (values.videoSource) {
        try {
          const videoSource = parseVideoUrl(values.videoSource);
          values.videoSource = videoSource;
        } catch (error) {
          toast.error('Invalid video URL');
          return;
        }
      }

      if (type === 'Create') {
        try {
          const newProject = await createProject({
            ...values,
            images: uploadedImageUrls,
            order: values.order,
          });

          if (newProject) {
            toast.success('Project created successfully', {
              id: toastId,
              description: 'Your project has been created and saved',
            });
            form.reset();
            router.push(
              `/sunsetparis-admin?artist=${encodeURIComponent(values.artist)}`
            );
          }
        } catch (error) {
          console.error('Create project error:', error);
          toast.error('Failed to create project');
        }
      }

      if (type === 'Update' && projectId) {
        try {
          const updatedProject = await updateProject(
            projectId,
            {
              ...values,
              images: uploadedImageUrls,
              _id: projectId,
            },
            project?.order || 1
          );

          if (updatedProject) {
            toast.success('Project Updated successfully', {
              id: toastId,
              description: 'Your project has been updated and saved',
            });
            form.reset();
            router.push(
              `/sunsetparis-admin?artist=${encodeURIComponent(values.artist)}`
            );
          }
        } catch (error) {
          console.error('Update project error:', error);
          toast.error('Failed to update project');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
  };
};
