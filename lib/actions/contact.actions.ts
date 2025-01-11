'use server';

import { CreateContactParams, UpdateContactParams } from '@/types';
import { connectToDatabase } from '../database';
import Contact from '../database/models/contact.model';
import { handleError } from '../utils';
import { revalidatePath } from 'next/cache';

export const createContact = async (contact: CreateContactParams) => {
  try {
    await connectToDatabase();

    const newContact = await Contact.create({
      ...contact,
    });

    revalidatePath('/sunsetparis-admin');

    return JSON.parse(JSON.stringify(newContact));
  } catch (error) {
    console.error('Error creating contact:', error);
    handleError(error);
  }
};

export const updateContact = async (contact: UpdateContactParams) => {
  try {
    await connectToDatabase();

    const updatedContact = await Contact.findByIdAndUpdate(
      contact._id,
      {
        $set: {
          fullName: contact.fullName,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
        },
      },
      { new: true }
    );

    if (!updatedContact) throw new Error('Contact not found');
    revalidatePath('/sunsetparis-admin');

    return JSON.parse(JSON.stringify(updatedContact));
  } catch (error) {
    console.error('Error updating contact:', error);
    handleError(error);
  }
};

export const getContact = async () => {
  try {
    await connectToDatabase();

    const contact = await Contact.findOne().sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(contact));
  } catch (error) {
    console.error('Error getting contact:', error);
    handleError(error);
  }
};
