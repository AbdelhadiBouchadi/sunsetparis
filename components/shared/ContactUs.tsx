'use client';

import React from 'react';
import Link from 'next/link';

const ContactUs = () => {
  return (
    <div className="max-w-[80vw] w-full h-full flex flex-col justify-center items-center shadow-xl bg-white dark:bg-black py-4 md:py-8 rounded-xl overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center px-20 gap-4 md:gap-8 lg:gap-12 py-4 md:py-8 lg:py-12">
        <h3 className="font-bold text-xl lg:text-3xl uppercase">Booking :</h3>
        <h5 className="font-normal text-xl lg:text-3xl text-center uppercase flex flex-col md:flex-row md:gap-4">
          Sunset Agency <span>-</span> Adélia Cailleux
        </h5>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4">
          <Link
            href="https://wa.me/+33603211791"
            className="underline text-lg text-center uppercase"
            target="_blank"
          >
            +33 6 03 2117 91
          </Link>
          <span className="hidden lg:inline-block font-semibold">/</span>
          <Link
            href="mailto:adelia.booking@gmail.com?subject=Subject%20Here&body=Body%20Text%20Here"
            className="underline text-lg text-center uppercase "
          >
            adelia.booking@gmail.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
