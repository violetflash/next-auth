'use client';
import { BackButton, BackButtonProps } from '@/components/auth/back-button';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// @flow
import * as React from 'react';

type Props =
  BackButtonProps & {
  children: React.ReactNode;
  headerLabel: string;
  showSocial?: boolean;
  showBackButton?: boolean;
};
export const CardWrapper = ({
                              backButtonHref,
                              backButtonLabel,
                              showSocial,
                              headerLabel,
                              showBackButton = true,
                              children
                            }: Props) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social/>
        </CardFooter>
      )}
      {showBackButton && (
        <CardFooter>
          <BackButton
            backButtonHref={backButtonHref}
            backButtonLabel={backButtonLabel}
          />
        </CardFooter>
      )}
    </Card>
  );
};