'use client';

import { admin } from '@/actions/admin';
import { RoleGuard } from '@/components/auth/role-guard';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

type Props = {

};
const AdminPage = (props: Props) => {
  const role = useCurrentRole();

  const onApiRouteClick = () => {
    fetch('/api/admin', { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          toast.success('Success! Response from API route: ' + response.statusText);
          return;
        }
        toast.error('Error! Response from API route: ' + response.statusText);
      });
  }

  const onActionClick = () => {
    try {
      admin().then((response) => {
        if (response.error) {
          toast.error(response.error);
          return;
        }
        toast.success(response.success);
      })
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔑 Admin panel
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGuard allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGuard>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button
            variant="default"
            onClick={onApiRouteClick}
          >
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          <Button variant="default" onClick={onActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;