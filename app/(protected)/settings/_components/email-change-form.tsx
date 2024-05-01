'use client';
import { changeEmail } from '@/actions/email-change';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EmailSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof EmailSchema>;


export const EmailChangeForm = () => {
  const {update} = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const isOAuth = user?.is_oauth;

  const form = useForm<FormData>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: user?.email ?? '',
    }
  });

  const onchangeEmail = (values: FormData) => {
    try {
      startTransition(() => {
        changeEmail(values)
          .then((response) => {
            if (response.error) {
              toast.error(response.error);
              return;
            }
            update();
            toast.success(response.success);
          })
      })
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onchangeEmail)}
        className="space-y-4"
      >
        <div className="space-y-4">
          {isOAuth && (
            <div className="space-y-1.5">
              <FormLabel>Email</FormLabel>
              <FormDescription>
                {user?.email}
              </FormDescription>
            </div>
          )}
          {!isOAuth && (
              <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormDescription>
                      You will receive an email with a link to confirm your new email.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending || isOAuth}
                        type="email"
                        placeholder="john.doe@example.com"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
          )}
        </div>
        {!isOAuth && (
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="">
              Update email
            </Button>
          </div>

        )}
      </form>
    </Form>
  )
}