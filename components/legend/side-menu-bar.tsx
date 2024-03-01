import { useState } from 'react';

type SideMenuBarProps = {
  children: React.ReactNode;
};

export const SideMenuBar: React.FC<SideMenuBarProps> = ({ children }) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-10 h-full w-20 bg-white">
        여기는 Menu Tab
      </div>
      {children}
    </>
  );
};
