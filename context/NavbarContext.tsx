"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
    isCollapsed: boolean;
    toggleNavbar: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const toggleNavbar = () => setIsCollapsed(prevState => !prevState);

    return (
        <NavbarContext.Provider value={{ isCollapsed, toggleNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
