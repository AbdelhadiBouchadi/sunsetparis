'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getContact } from '@/lib/actions/contact.actions';
import { IContact } from '@/lib/database/models/contact.model';

const ContactUs = () => {
  const [contact, setContact] = useState<IContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactData = await getContact();
        setContact(contactData);
      } catch (error) {
        console.error('Error fetching contact:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] border-[#FB65A4]"
          role="status"
        />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center text-gray-500">
        No contact information available
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${contact.phone.replace(/\D/g, '')}`;
  const emailLink = `mailto:${contact.email}?subject=Subject%20Here&body=Body%20Text%20Here`;

  return (
    <div className="max-w-[80vw] w-full h-full flex flex-col justify-center items-center bg-white dark:bg-black py-4 md:py-8 rounded-xl overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center gap-4 py-4 md:py-8 lg:py-12">
        {contact.message && (
          <p className="text-lg text-start text-black dark:text-white mt-2 hidden">
            {contact.message}
          </p>
        )}
        <div className="flex flex-col items-start justify-center">
          <h3 className="font-semibold text-xl lg:text-3xl uppercase text-black dark:text-white tracking-widest">
            contact sunset :
          </h3>
          <h5 className="text-lg text-start tracking-widest text-black dark:text-white">
            {contact.fullName}
          </h5>
          <Link
            href={whatsappLink}
            className="w-full text-lg text-start uppercase text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.phone}
          </Link>
          <Link
            href={emailLink}
            className="text-lg text-start text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {contact.email}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
