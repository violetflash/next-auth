// @flow
import { FormError } from '@/components/form-error';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
  allowedRole: UserRole;
};
export const RoleGuard = ({ children, allowedRole }: Props) => {
  const role = useCurrentRole();
  // const { push } = useRouter();

  if (role !== allowedRole) {
    return <FormError message="You do not have access to this page" />
    // push(SETTINGS_ROUTE);
    // return;
  }

  return (
    <>
      {children}
    </>
  )
};