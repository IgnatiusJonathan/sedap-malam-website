"use client";

import { ReactNode } from 'react';
import { useNavbar } from '../context/NavbarContext';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  const { isCollapsed } = useNavbar();

  return (
    <main
      className="content"
      style={{
        flex: 1,
        marginTop: '60px',
        marginLeft: isCollapsed ? '0px' : '220px',
        padding: '20px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      {children}
    </main>
  );
};

export default Content;
