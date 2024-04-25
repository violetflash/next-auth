import { LoginForm } from '@/components/auth/login-form';
import React, { Suspense } from 'react';

type Props = {

};
const LoginPage = (props: Props) => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;