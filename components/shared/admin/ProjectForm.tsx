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
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import Dropdown from './DropDown';
import { useRouter } from 'next/navigation';
import { FileUploader } from './FileUploader';
import SubmitButton from './SubmitButton';
import { toast } from 'sonner';

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

  const initialValues =
    project && type === 'Update'
      ? {
          ...project,
          artist: project.artist as
            | 'arthur paux'
            | 'gabriel porier'
            | 'kevin le dortz'
            | 'mathieu caplanne'
            | 'nicolas gautier'
            | 'romain loiseau'
            | 'thomas canu',
        }
      : { ...projectDefaultValues, order: 1 };

  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialValues as z.infer<typeof projectFormSchema>,
  });

  const watchArtist = form.watch('artist');

  useEffect(() => {
    const updateMaxOrder = async () => {
      const count = await getProjectCountByArtist(watchArtist);
      setMaxOrder(count);
    };

    updateMaxOrder();
  }, [watchArtist]);

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

      let uploadedImageUrls = values.images;

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);

        if (!uploadedImages) {
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
          });

          if (newProject) {
            toast.success('Project created successfully', {
              id: toastId,
              description: 'Your project has been created and saved',
            });
            form.reset();
            router.push('/sunsetparis-admin');
          }
        } catch (error) {
          console.error('Create project error:', error);
          toast.error('Failed to create project');
        }
      }

      if (type === 'Update' && projectId) {
        try {
          const updatedProject = await updateProject({
            ...values,
            images: uploadedImageUrls,
            _id: projectId,
          });

          if (updatedProject) {
            toast.success('Project Updated successfully', {
              id: toastId,
              description: 'Your project has been updated and saved',
            });
            form.reset();
            router.push('/sunsetparis-admin');
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
            name="order"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={maxOrder}
                    placeholder={`Display Order (1-${maxOrder})`}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
            name="videoSource"
            render={({ field }) => (
              <FormItem className="w-full">
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
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrls={field.value}
                  setFiles={setFiles}
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
