'use client';
import { logout } from '@/actions/logout';
import React from 'react';

type Props = {
  children: React.ReactNode;
}
export const LogoutButton = ({ children }: Props) => {

  return (
    <span
      className="cursor-pointer"
      onClick={() => logout()}
    >
      {children}
    </span>
  );
}