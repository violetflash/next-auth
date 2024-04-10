'use client';

// @flow
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

type Props = {};
export const Social = (props: Props) => {
  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <Button
        className="w-full flex items-center gap-x-2"
        variant="outline"
        size="lg"
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5" /> Sign in with Google
      </Button>
      <Button
        className="w-full flex items-center gap-x-2"
        variant="outline"
        size="lg"
        onClick={() => {}}
      >
        <FaGithub className="h-5 w-5" /> Sign in with GitHub
      </Button>
    </div>
  );
};