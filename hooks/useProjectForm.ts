'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { IProjectForm } from '@/types';

export function useProjectForm(setValue: UseFormSetValue<IProjectForm>) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const artistFromUrl = searchParams.get('artist');
    if (artistFromUrl) {
      setValue('artist', artistFromUrl as any);
    }
  }, [searchParams, setValue]);
}
