'use client';
// @flow
import * as React from 'react';
import { BackButton, BackButtonProps } from '@/components/auth/back-button';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

type Props =
  BackButtonProps & {
  children: React.ReactNode;
  headerLabel: string;
  showSocial?: boolean;
};
export const CardWrapper = ({
                              backButtonHref,
                              backButtonLabel,
                              showSocial,
                              headerLabel,
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
      <CardFooter>
        <BackButton
          backButtonHref={backButtonHref}
          backButtonLabel={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
};