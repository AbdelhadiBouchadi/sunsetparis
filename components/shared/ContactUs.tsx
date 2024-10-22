'use client';

import React from 'react';
import Link from 'next/link';

const ContactUs = () => {
  return (
    <div className="max-w-[80vw] w-full h-full flex flex-col justify-center items-center shadow-xl bg-white dark:bg-black py-4 md:py-8 rounded-xl overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-8 lg:gap-12 py-4 md:py-8 lg:py-12">
        <h3 className="font-semibold text-xl lg:text-3xl uppercase text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] tracking-widest">
          contact sunset :
        </h3>
        <h5 className="font-normal text-xl lg:text-3xl text-center uppercase text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] ">
          Adélia Cailleux
        </h5>
        <div className="flex flex-col  items-center justify-center gap-2 lg:gap-4">
          <Link
            href="https://wa.me/+33603211791"
            className=" text-lg text-center uppercase text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2]"
            target="_blank"
          >
            +33 6 03 2117 91
          </Link>
          <Link
            href="mailto:adelia.booking@gmail.com?subject=Subject%20Here&body=Body%20Text%20Here"
            className=" text-lg text-center text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] "
          >
            adelia.booking@gmail.com
          </Link>
        </div>
      </div>
      <Link
        href="/sunsetparis-admin"
        className=" text-lg text-center text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] uppercase underline"
      >
        admin
      </Link>
    </div>
  );
};

export default ContactUs;
