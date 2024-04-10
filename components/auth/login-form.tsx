// @flow
import { CardWrapper } from '@/components/auth/card-wrapper';
import * as React from 'react';

type Props = {

};
export const LoginForm = (props: Props) => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don'have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login Form
    </CardWrapper>
  );
};