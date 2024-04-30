import { UserInfo } from '@/components/user-info';
import { getCurrentUser } from '@/lib/auth-helpers';

type Props = {

};
const ServerPage = async (props: Props) => {
  const user = await getCurrentUser();
  return (
    <UserInfo
      user={user}
      label="💻 Server Component"
    />
  );
};

export default ServerPage;