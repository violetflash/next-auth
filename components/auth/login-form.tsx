'use client';
// @flow
import { login } from '@/actions/login';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LOGIN_ROUTE, RESET_PASSWORD_ROUTE } from '@/lib/routes-constants';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {

};
export const LoginForm = (props: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const router = useRouter();
  const urlError = searchParams.get('error');
  const oauthMessage = urlError=== "OAuthAccountNotLinked"
  ? "Email already in use with different provider" : undefined;
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
  const [show2FA, setShow2FA] = React.useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      login(data, callbackUrl)
        .then((res) => {
          if (res?.error) {
            form.reset();
            setError(res.error);
          }
          if  (res?.success) {
            form.reset();
            setSuccess(res.success);
          }
          // TODO: add when we add 2FA
          if (res?.twoFactor) {
            setShow2FA(true);
          }
       })
        .catch((e) => {
          console.error(e);
          setError('Something went wrong during login');
        })
    })
  }

  useEffect(() => {
    if (oauthMessage) {
      setError(oauthMessage);
      router.push(LOGIN_ROUTE);
    }
  }, [oauthMessage])

  return (
    <CardWrapper
      headerLabel={show2FA ? 'Two-factor authentication' : 'Welcome back'}
      backButtonLabel="Don'have an account?"
      backButtonHref="/auth/register"
      showSocial={!show2FA}
      showBackButton={!show2FA}
    >
      <Form
        {...form}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {!show2FA && (
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="email"
                          placeholder="Email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="password"
                          placeholder="Password"
                        />
                      </FormControl>
                      <Button
                        className="px-0 font-normal"
                        size="sm"
                        variant="link"
                        asChild
                      >
                        <Link href={RESET_PASSWORD_ROUTE}>
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {show2FA && (
              <FormField
                control={form.control}
                name='code'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {show2FA ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};