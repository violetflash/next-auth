'use client';
import { changePassword } from '@/actions/change-password';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { PasswordsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof PasswordsSchema>;


export const PasswordChangeForm = () => {
  const {update} = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(PasswordsSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    }
  });

  const onChangePassword = (values: FormData) => {
    console.log('values: >>', values);
    startTransition(() => {
      changePassword(values)
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
            return;
          }
          update().then(() => {
            form.reset()
          });
          toast.success(res.success);
        })
        .catch((e) => {
          toast.error('Something went wrong during updating password');
        })
    })
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onChangePassword)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='newPassword'
            render={({field}) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            Update password
          </Button>
        </div>
      </form>
    </Form>
  );
}