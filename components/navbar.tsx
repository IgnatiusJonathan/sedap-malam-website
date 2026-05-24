"use client";

import Link from 'next/link';
import { useNavbar } from '../context/NavbarContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isCollapsed, toggleNavbar } = useNavbar();
  const currentPath = usePathname(); //buat bisa menutup/buka akses halaman tertentu tergantung halaman sekarang
  const [name, setName] = useState<string | null>(null); // Null buat awal2 testing pas gk ada session (buat worker management)
  useEffect(() => {
    //update nama pas udh logged in
    const updateName = () => {
      const savedName = localStorage.getItem('nama');
      setName(savedName);
    };

    updateName();
    //update navbar
    window.addEventListener('session-update', updateName);
    return () => {
      window.removeEventListener('session-update', updateName);
    };
  }, []);

  return (
    <aside className={`navbar ${isCollapsed ? 'collapsed' : ''}`} id="navbar">
      <button className="toggle-btn" id="toggleBtn" onClick={toggleNavbar}></button>
      <ul>
        <li><Link href="/dashboard" data-title="Dashboard">Dashboard</Link></li>
        {currentPath === '/inventory' ?
          (<li><Link href="/add_item" data-title="AddItem">Add Item</Link></li>) : (
            <li><Link href="/inventory" data-title="Inventory">Inventory</Link></li>
          )}
        {currentPath === '/membership' ?
          (<li><Link href="/add_member" data-title="AddMember">Add Member</Link></li>) : (
            <li><Link href="/membership" data-title="Membership">Membership</Link></li>
          )}
        <li><Link href="/history" data-title="History">History</Link></li>
        <li><Link href="/checkout" data-title="Checkouts">Checkouts</Link></li>
        {name === 'admin' && (
          <li><Link href="/worker_management" data-title="workerManagement">Worker Management</Link></li>
        )}
      </ul>
    </aside>
  );
};

export default Navbar;
