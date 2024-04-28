'use client';

import { setNewPassword } from '@/actions/new-password';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { TOKEN_QUERY_PARAM } from '@/lib/constants';
import { LOGIN_ROUTE } from '@/lib/routes-constants';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {

};
export const NewPasswordForm = memo(function NewPasswordForm(props: Props) {
  const searchParams = useSearchParams();
  const token = searchParams.get(TOKEN_QUERY_PARAM);
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  // const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      setNewPassword(data, token).then((res) => {
          setError(res?.error);
          setSuccess(res?.success);
          // TODO redirect to login page ?
      })
    })
  }

    return (
      <CardWrapper
        headerLabel="Change your password"
        backButtonLabel="Back to login"
        backButtonHref={LOGIN_ROUTE}
      >
        <Form
          {...form}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name='password'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="Confirm password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Change password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    );
});