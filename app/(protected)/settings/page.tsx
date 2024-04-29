import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

type Props = {

};
const SettingsPage = async (props: Props) => {
  const session = await auth();
  // const userStatsInfo = await getUserLoginTime(session?.user?.id);

  return (
    <div>
      {JSON.stringify(session, null, 2)}
      {/*{userStatsInfo && (*/}
      {/*  <div>*/}
      {/*    Since your last visit: {getTimeDifferenceString({*/}
      {/*    startTime: userStatsInfo?.last_login_at,*/}
      {/*    endTime: new Date().toISOString()*/}
      {/*  })}*/}
      {/*  </div>*/}
      {/*)}*/}
      <form
        action={async () => {
          "use server";
          // TODO Error if user logged in by OAuth
          // await refreshUserLoginTime(session?.user?.id);
          await signOut();
        }}
      >
        <Button type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;