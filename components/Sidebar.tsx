'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { href: '/dashboard', title: 'Dashboard', icon: '📊' },
    { href: '/inventory', title: 'Inventory', icon: '📦' },
    { href: '/membership', title: 'Membership', icon: '👥' },
    { href: '/history', title: 'History', icon: '📝' },
    { href: '/checkouts', title: 'Checkouts', icon: '💰' },
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <button className="toggle-btn" id="toggleBtn" onClick={toggleSidebar}>
        {isCollapsed ? '→' : '←'}
      </button>
      <ul>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href} 
              className={pathname === item.href ? 'active' : ''}
              title={item.title}
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && <span className="title">{item.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}