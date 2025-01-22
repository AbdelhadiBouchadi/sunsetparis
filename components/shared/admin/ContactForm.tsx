'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { contactFormSchema } from '@/lib/validator';
import { createContact, updateContact } from '@/lib/actions/contact.actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { IContact } from '@/lib/database/models/contact.model';
import { z } from 'zod';
import TiptapEditor from './TiptapEditor';

const ContactForm = ({ contact }: { contact?: IContact }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  useEffect(() => {
    if (contact) {
      form.reset({
        fullName: contact.fullName,
        email: contact.email,
        phone: contact.phone,
        message: contact.message,
      });
    }
  }, [contact, form]);

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      setIsLoading(true);
      const toastId = toast.loading(
        contact ? 'Updating contact...' : 'Creating contact...'
      );

      if (contact) {
        const updatedContact = await updateContact({
          _id: contact._id,
          ...values,
        });

        if (updatedContact) {
          toast.success('Contact updated successfully', {
            id: toastId,
            description: 'Contact information has been updated',
          });
        }
      } else {
        const newContact = await createContact(values);

        if (newContact) {
          toast.success('Contact created successfully', {
            id: toastId,
            description: 'Contact information has been saved',
          });
          form.reset();
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
        className="flex flex-col gap-5 w-full max-w-2xl mx-auto"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-medium text-gray-300">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name"
                  className="shad-input border-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-medium text-gray-300">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  className="shad-input border-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-medium text-gray-300">
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number"
                  className="shad-input border-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-medium text-gray-300">
                Message
              </FormLabel>
              <FormControl>
                <TiptapEditor
                  content={field.value}
                  onChange={field.onChange}
                  dir="ltr"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-green-700 hover:bg-green-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {contact ? 'Updating...' : 'Creating...'}
            </>
          ) : contact ? (
            'Update Contact'
          ) : (
            'Create Contact'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
