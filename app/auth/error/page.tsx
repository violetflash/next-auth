import { ErrorCard } from '@/components/auth/error-card';

type Props = {

};
const AuthErrorPage = (props: Props) => {
  return (
    <ErrorCard>

      <p>Please try again later.</p>
    </ErrorCard>
  );
};

export default AuthErrorPage;