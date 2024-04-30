import { Navbar } from '@/app/(protected)/_components/navbar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="size-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;