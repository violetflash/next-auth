import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';



type Props = {

};
const SettingsPage = async (props: Props) => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session, null, 2)}
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