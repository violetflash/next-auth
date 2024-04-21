'use client';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
// @flow
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SlSocialVkontakte } from 'react-icons/sl';

type Props = {};
export const Social = (props: Props) => {

  const onClick = (provider: "google" | "github" ) => {

    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <Button
        className="w-full flex items-center gap-x-2"
        variant="outline"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" /> Sign in with Google
      </Button>
      <Button
        className="w-full flex items-center gap-x-2"
        variant="outline"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" /> Sign in with GitHub
      </Button>
      <Button
        className="w-full flex items-center gap-x-2"
        variant="outline"
        size="lg"
        onClick={() => {}}
      >
        <SlSocialVkontakte className="h-5 w-5" /> Sign in with VK
      </Button>
    </div>
  );
};