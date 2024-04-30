// @flow
import { ExtendedUser } from '@/auth';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import * as React from 'react';

type Props = {
  user?: ExtendedUser;
  label: string;
};

const Row = ({ label, value }: { label: string; value: string | boolean }) => {
  const outValue = typeof value === 'string' ? value : value ? 'YES' : 'NO';
  const isBoolean = typeof value === 'boolean';
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <p className="text-sm font-medium">
        <b>{label.toUpperCase()}:</b>
      </p>
      {isBoolean ? (
        <Badge variant={isBoolean && value ? 'success' : 'destructive'}>
          {outValue}
        </Badge>
      ) : (
        <p className="truncate max-w-[250px] font-mono p-1 bg-slate-100 rounded-md">{outValue}</p>
      )}
    </div>
  );
}

export const UserInfo = ({ user, label }: Props) => {
  console.log('user: >>', user);
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {user && Object.entries(user).map(([key, value]) => (
          <Row key={key} label={key} value={value} />
        ))}
      </CardContent>
    </Card>
  );
};