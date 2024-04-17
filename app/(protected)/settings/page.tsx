import { auth } from '@/auth';



type Props = {

};
const SettingsPage = async (props: Props) => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session, null, 2)}
    </div>
  );
};

export default SettingsPage;