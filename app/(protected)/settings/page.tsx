'use client';
import { EmailChangeForm } from '@/app/(protected)/settings/_components/email-change-form';
import { PasswordChangeForm } from '@/app/(protected)/settings/_components/password-change-form';
import { SettingsChangeForm } from '@/app/(protected)/settings/_components/settings-change-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCurrentUser } from '@/hooks/use-current-user';
import { SettingsSchema } from '@/schemas';
import * as React from 'react';
import { z } from 'zod';


type Props = {};
type FormData = z.infer<typeof SettingsSchema>;

const SettingsPage = (props: Props) => {
  const user = useCurrentUser();
  const isOAuth = user?.is_oauth;

  return (
    <Card>
      <CardHeader className="w-[600px]">
        <p className="text-2xl text-center font-semibold">
          ⚙️ Profile
        </p>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 mt-6">
        <EmailChangeForm />
        <Separator />
        {!isOAuth && (
          <>
            <PasswordChangeForm />
            <Separator />
          </>
        )}
        <SettingsChangeForm />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;

// <div className="bg-white p-10 rounded-xl">
//   {/*{userStatsInfo && (*/}
//   {/*  <div>*/}
//   {/*    Since your last visit: {getTimeDifferenceString({*/}
//   {/*    startTime: userStatsInfo?.last_login_at,*/}
//   {/*    endTime: new Date().toISOString()*/}
//   {/*  })}*/}
//   {/*  </div>*/}
//   {/*)}*/}
//   <Button onClick={onClickSignOut}>
//     Sign out
//   </Button>
// </div>