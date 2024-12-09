'use client';

import React from 'react';
import Link from 'next/link';

const ContactUs = () => {
  return (
    <div className="max-w-[80vw] w-full h-full flex flex-col justify-center items-center bg-white dark:bg-black py-4 md:py-8 rounded-xl overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center gap-4 py-4 md:py-8 lg:py-12">
        <h3 className="font-semibold text-xl lg:text-3xl uppercase text-black dark:text-white tracking-widest">
          contact sunset :
        </h3>
        <h5 className="font-normal text-xl lg:text-3xl text-center uppercase text-black dark:text-white ">
          Adélia Cailleux
        </h5>
        <div className="flex flex-col  items-center justify-center gap-2">
          <Link
            href="https://wa.me/+33603211791"
            className=" text-lg text-center uppercase text-black dark:text-white"
            target="_blank"
          >
            +33 6 03 2117 91
          </Link>
          <Link
            href="mailto:adelia.booking@gmail.com?subject=Subject%20Here&body=Body%20Text%20Here"
            className=" text-lg text-center text-black dark:text-white "
          >
            adelia.booking@gmail.com
          </Link>
        </div>
      </div>
      <Link
        href="/sunsetparis-admin"
        className=" text-lg text-center text-black dark:text-white uppercase underline"
      >
        admin
      </Link>
    </div>
  );
};

export default ContactUs;
