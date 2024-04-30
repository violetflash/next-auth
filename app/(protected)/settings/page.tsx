'use client';
import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';

type Props = {

};
const SettingsPage =  (props: Props) => {
  const user = useCurrentUser();
  // const userStatsInfo = await getUserLoginTime(session?.user?.id);

  const onClickSignOut = () => {
    logout();
  }

  return (
    <div className="bg-white p-10 rounded-xl">
      {/*{userStatsInfo && (*/}
      {/*  <div>*/}
      {/*    Since your last visit: {getTimeDifferenceString({*/}
      {/*    startTime: userStatsInfo?.last_login_at,*/}
      {/*    endTime: new Date().toISOString()*/}
      {/*  })}*/}
      {/*  </div>*/}
      {/*)}*/}
      <Button onClick={onClickSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default SettingsPage;