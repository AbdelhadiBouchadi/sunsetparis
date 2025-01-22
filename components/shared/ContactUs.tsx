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
    <div className="flex flex-col justify-center items-center w-full h-full py-10 bg-white dark:bg-black md:px-12">
      <p className="md:text-2xl text-black dark:text-white text-center leading-relaxed">
        Shaping the craft of color grading{' '}
        <span className="hidden sm:inline">
          and talent management in Paris since 2017,
        </span>
      </p>
      <p className="sm:hidden md:text-2xl text-black dark:text-white text-center leading-relaxed">
        and talent management in Paris since 2017,
      </p>
      <p className="md:text-2xl text-black dark:text-white text-center mt-2">
        We proudly showcase Paris’s leading colorists,
      </p>
      <p className="md:text-2xl text-black dark:text-white text-center mt-2">
        Bringing unparalleled expertise to your creative projects.
      </p>

      <div className="mt-12 text-center">
        <h5 className="text-xl text-black dark:text-white">
          {contact.fullName}
        </h5>
        <Link
          href={whatsappLink}
          className="block text-xl text-black dark:text-white hover:text-transparent dark:hover:text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {contact.phone}
        </Link>
        <Link
          href={emailLink}
          className="block text-xl text-black dark:text-white hover:text-transparent dark:hover:text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] transition duration-300"
        >
          {contact.email.charAt(0).toUpperCase() + contact.email.slice(1)}
        </Link>
      </div>
    </div>
  );
};

export default ContactUs;
