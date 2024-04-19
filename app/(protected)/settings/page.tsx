import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { getUserLoginStats } from '@/data/user';
import { getTimeDifferenceString } from '@/lib/helpers/get-time-difference-string';

type Props = {

};
const SettingsPage = async (props: Props) => {
  const session = await auth();
  let userStatsInfo = {} as any;

  if (session) {
    userStatsInfo = await getUserLoginStats(session?.user?.id);
  }
  return (
    <div>
      {JSON.stringify(session, null, 2)}
      <div>
        Since last login: {getTimeDifferenceString({
        startTime: userStatsInfo?.timestamp,
        endTime: new Date().toISOString()
      })}
      </div>
      <form
        action={async () => {
          "use server";
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