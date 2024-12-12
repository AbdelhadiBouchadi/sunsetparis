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

        <div className="flex flex-col  items-start justify-center">
          <h5 className="text-lg text-start tracking-widest text-black dark:text-white ">
            Adélia Cailleux
          </h5>
          <Link
            href="https://wa.me/+33603211791"
            className="w-full text-lg text-start uppercase text-black dark:text-white"
            target="_blank"
          >
            +33 6 03 21 17 91
          </Link>
          <Link
            href="mailto:adelia.booking@gmail.com?subject=Subject%20Here&body=Body%20Text%20Here"
            className="text-lg text-start text-black dark:text-white "
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
