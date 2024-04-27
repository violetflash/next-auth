import { CardWrapper } from '@/components/auth/card-wrapper';
import { LOGIN_ROUTE } from '@/lib/routes-constants';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = ({ children }: { children: React.ReactNode }) => {

  return (
    <CardWrapper
      backButtonLabel="Back to login"
      backButtonHref={LOGIN_ROUTE}
      headerLabel="Oops! Something went wrong"
    >
      <div className="w-full flex items-center justify-center gap-x-2">
        <ExclamationTriangleIcon className="w-4 h-4 text-destructive"/>
        {children}
      </div>
    </CardWrapper>
  );
}