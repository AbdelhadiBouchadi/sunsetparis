'use client';

import React from 'react';

export const GradientArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transform rotate-180"
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A67DD2" />
        <stop offset="50%" stopColor="#FB65A4" />
        <stop offset="100%" stopColor="#FCBB54" />
      </linearGradient>
      <use href="#arrow-path" stroke="url(#arrow-gradient)" />
    </path>
  </svg>
);
