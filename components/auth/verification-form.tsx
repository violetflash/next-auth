'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { db } from '@/lib/db';
import { TOKEN_QUERY_PARAM } from '@/lib/mail';
import { DEFAULT_ROOT_ROUTE, LOGIN_ROUTE } from '@/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {

};
export const NewVerificationForm = (props: Props) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const token = searchParams.get(TOKEN_QUERY_PARAM);

  const onSubmit = useCallback(() => {
    console.log('token: >>', token);
  }, [token])

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  // if (!token) {
  //   push(DEFAULT_ROOT_ROUTE);
  //   return;
  // }

  // const exitingToken = await db.verificationToken.findUnique({
  //   where: {
  //     token
  //   }
  // });
  //
  // if (!exitingToken) {
  //   push(DEFAULT_ROOT_ROUTE);
  //   return;
  // }
  //
  // await db.user.update({
  //   where: {
  //     email: exitingToken.email
  //   },
  //   data: {
  //     emailVerified: new Date()
  //   }
  // });

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref={LOGIN_ROUTE}
    >
      <div className="flex items-center w-full justify-center flex-col gap-y-4">
        <BeatLoader />
        <h1>Account verified with token {token}</h1>
      </div>
    </CardWrapper>
  );
};