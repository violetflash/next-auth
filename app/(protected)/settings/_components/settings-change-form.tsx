'use client';
import { changeSettings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCurrentUser } from '@/hooks/use-current-user';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


type Props = {};
type FormData = z.infer<typeof SettingsSchema>;

export const SettingsChangeForm = (props: Props) => {
  const {update} = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const isOAuth = user?.is_oauth;

  const form = useForm<FormData>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name ?? '',
      is_two_factor_enabled: user?.is_two_factor_enabled ?? false,
      role: user?.role ?? UserRole.USER
    }
  });


  const onChangeSettings = (values: FormData) => {
    startTransition(() => {
      changeSettings(values)
        .then((res) => {
          console.log('res: >>', res);
          if (res.error) {
            toast.error(res.error);
            return;
          }
          update();
          toast.success(res.success);
        })
        .catch((e) => {
          toast.error('Something went wrong during updating settings');
        })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onChangeSettings)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          {!isOAuth && (
            <>
              <FormField
                control={form.control}
                name="is_two_factor_enabled"
                render={({field}) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Two factor authentication</FormLabel>
                      <FormDescription>
                        Add an additional layer of security to your account
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="role"
            render={({field}) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>{UserRole.ADMIN}</SelectItem>
                    <SelectItem value={UserRole.USER}>{UserRole.USER}</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your role
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            Update profile
          </Button>
        </div>
      </form>
    </Form>
  );
};
