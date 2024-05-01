'use client';

import { verifyToken } from '@/actions/verify-token';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { TOKEN_QUERY_PARAM } from '@/lib/constants';
import { LOGIN_ROUTE } from '@/lib/routes-constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {

};
export const NewVerificationForm = memo(function NewVerificationForm(props: Props) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const token = searchParams.get(TOKEN_QUERY_PARAM);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const isVerified = useRef<boolean>(false);
  const isLoading = !error && !success;

  const checkToken = useCallback(() => {
    // cover the dev strict mode bug when useEffect is called twice
    // therefore on the second call our token will already be verified and deleted
    if (isVerified.current) return;
    if (!token) {
      setError('Missing token');
      return;
    }

    verifyToken(token)
      .then((response) => {
        setError(response.error);
        setSuccess(response.success);
        isVerified.current = true;
      })
      .catch(() => {
        setError('Something went wrong during verification process');
      })
      .finally(() => {
        isVerified.current = true;
      });
  }, [token, isVerified.current])

  useEffect(() => {
    checkToken();
  }, [checkToken]);

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
        {isLoading
          ? <BeatLoader />
          : (
            <>
              {!error && <FormSuccess message={success} />}
              {!success && <FormError message={error} />}
            </>
          )
        }
      </div>
    </CardWrapper>
  );
});