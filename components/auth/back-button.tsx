'use client';

// @flow
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as React from 'react';

export type BackButtonProps = {
  backButtonLabel: string;
  backButtonHref: string;
};
export const BackButton = ({
  backButtonLabel,
  backButtonHref
}: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  );
};