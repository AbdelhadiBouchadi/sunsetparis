'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { projectDefaultValues } from '@/constants';
import { IProject } from '@/lib/database/models/project.model';
import { useUploadThing } from '@/lib/uploadthing';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { parseVideoUrl, projectFormSchema } from '@/lib/validator';
import { z } from 'zod';
import {
  createProject,
  updateProject,
  getProjectCountByArtist,
} from '@/lib/actions/project.actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import Dropdown from './DropDown';
import { FileUploader } from './FileUploader';
import SubmitButton from './SubmitButton';
import { toast } from 'sonner';
import { Artist, IProjectForm } from '@/types';
import { useProjectForm } from '@/hooks/useProjectForm';
import { useRouter } from 'next/navigation';
import TextColorDropDown from './TextColorDropDown';
import CategoryDropDown from './CategoryDropDown';
import { getVideoThumbnail } from '@/lib/utils';

type ProjectFormProps = {
  type: 'Create' | 'Update';
  project?: IProject;
  projectId?: string;
};

const ProjectForm = ({ type, project, projectId }: ProjectFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [maxOrder, setMaxOrder] = useState<number>(1);
  const [thumbnailIndex, setThumbnailIndex] = useState(
    project?.thumbnailIndex || 0
  );

  const getInitialValues = (): IProjectForm => {
    if (project && type === 'Update') {
      return {
        title: project?.title || '',
        description: project?.description || '',
        artist: project?.artist as Artist,
        category: project?.category || '',
        images: project?.images || [],
        thumbnailIndex: project?.thumbnailIndex || 0,
        videoSource: project?.videoSource || '',
        place: project?.place || '',
        date: project?.date || '',
        real: project?.real || '',
        dop: project?.dop || '',
        order: project?.order || 1,
        textColor: project?.textColor || 'white',
      };
    }
    return projectDefaultValues;
  };

  const form = useForm<IProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: getInitialValues(),
  });

  useProjectForm(form.setValue);

  const { startUpload } = useUploadThing('imageUploader');

  const watchArtist = form.watch('artist');

  useEffect(() => {
    const updateMaxOrder = async () => {
      if (watchArtist) {
        const projectCount = await getProjectCountByArtist(watchArtist);
        setMaxOrder(type === 'Create' ? projectCount + 1 : projectCount);
        if (type === 'Create') {
          form.setValue('order', projectCount + 1);
        }
      }
    };

    updateMaxOrder();
  }, [watchArtist, type, form]);

  useEffect(() => {
    form.setValue('thumbnailIndex', thumbnailIndex);
  }, [thumbnailIndex, form]);

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    try {
      if (values.order < 1 || values.order > maxOrder) {
        toast.error(`Order must be between 1 and ${maxOrder}`);
        return;
      }

      setIsLoading(true);

      const toastId = toast.loading(
        type === 'Create' ? 'Creating project...' : 'Updating project...'
      );

      let uploadedImageUrls = values.images || [];

      // If there's a video URL and no images uploaded, try to get the video thumbnail
      if (
        values.videoSource &&
        (!uploadedImageUrls.length || uploadedImageUrls.length === 0)
      ) {
        const thumbnailUrl = await getVideoThumbnail(values.videoSource);
        if (thumbnailUrl) {
          uploadedImageUrls = [thumbnailUrl];
        }
      }

      // Only upload new images if files were selected
      if (files.length > 0) {
        const uploadedImages = await startUpload(files);

        if (!uploadedImages) {
          toast.error('Failed to upload images');
          setIsLoading(false);
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
          setIsLoading(false);
          return;
        }
      }

      if (type === 'Create') {
        try {
          const newProject = await createProject({
            ...values,
            images: uploadedImageUrls,
            order: values.order,
            thumbnailIndex,
          });

          if (newProject) {
            toast.success('Project created successfully', {
              id: toastId,
              description: 'Your project has been created and saved',
            });
            form.reset();
            const params = new URLSearchParams();
            params.set('artist', values.artist);
            router.push(`/sunsetparis-admin?${params.toString()}`);
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
              thumbnailIndex,
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
            const params = new URLSearchParams();
            params.set('artist', values.artist);
            router.push(`/sunsetparis-admin?${params.toString()}`);
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Title"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Description"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Artist
                </FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Category
                </FormLabel>
                <FormControl>
                  <CategoryDropDown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="videoSource"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Video URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Video URL (Optional)"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Location"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Date"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="real"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Real
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Real"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="dop"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Dop
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project DOP"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="textColor"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium text-gray-300">
                  Text Color
                </FormLabel>
                <FormControl>
                  <TextColorDropDown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrls={field.value || []}
                  setFiles={setFiles}
                  thumbnailIndex={thumbnailIndex}
                  onThumbnailChange={setThumbnailIndex}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          className="bg-green-700 hover:bg-green-400"
          isLoading={isLoading}
        >
          {type} Project
        </SubmitButton>
      </form>
    </Form>
  );
};

export default ProjectForm;
