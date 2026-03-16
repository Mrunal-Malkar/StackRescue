'use client'
import { ChevronLeft, Code, Home, LayoutDashboard, Lightbulb, LogOut,Settings } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from "@/components/utils/cn"
import SidebarItem from "@/components/ui/sidebar-item"
import Image from 'next/image'
import { redirect } from 'next/navigation'

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev)
  }

  const menuItems = [
    { icon: Home, label: 'Home', active: false, slug: '/' },
    { icon: LayoutDashboard, label: 'Explore', active: true, slug: '/explore' },
    { icon: Lightbulb, label: 'Idea stack', active: false, slug: '/create#idea' },
    { icon: Code, label: 'Project stack', active: false, slug: '/create#project' },
  ]

  const userActions = [
    { icon: Settings, label: 'Settings', active: false, slug: '/settings' },
    { icon: LogOut, label: 'Logout', active: false, slug: '/logout' },
  ]

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-r-gray-600 bg-black',
        isCollapsed ? 'w-20' : 'w-60',
        className,
      )}
    >
      {/* Header */}
      <div className="relative border-b border-b-gray-700 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Image
          className='hover:cursor-pointer'
          onClick={()=>redirect("/")}
          src="/logo-transparent.png"
          alt='halfstack logo'
          height={230}
          width={170}
          />
        </div>
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="absolute top-4 -right-3 p-1.5 cursor-pointer rounded-full  bg-gray-800 text-gray-100 hover:bg-gray-900"
        >
          <ChevronLeft
            className={cn('h-4 w-4 transition-transform duration-200', isCollapsed && 'rotate-180')}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex-1">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, idx) => (
            <li key={idx} className='tex'>
              <SidebarItem {...item} isCollapsed={isCollapsed} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer/User Section */}
      <div className="mt-auto border-t border-t-gray-700">
        {/* User Profile */}
        <div className="flex cursor-pointer items-center px-4 py-3 transition hover:bg-gray-600" onClick={()=>redirect("/profile/username")}>
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face"
            alt="John Doe"
            className="size-8 rounded-full"
          />
          <div
            className={cn(
              'ml-3 flex flex-col transition-opacity duration-200 overflow-x-auto',
              isCollapsed && 'hidden opacity-0',
            )}
          >
            <h3 className="text-sm font-medium text-gray-300">John Doe</h3>
            <h4 className="text-xs text-gray-400 flex flex-wrap">john@example.com</h4>
          </div>
        </div>

        {/* User Actions */}
        <div className="px-2 pb-2">
          {userActions.map((item, idx) => (
            <SidebarItem key={idx} {...item} isCollapsed={isCollapsed} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-t-gray-700 px-4 py-3">
          <span
            className={cn(
              'text-xs text-gray-400 transition-opacity duration-200',
              isCollapsed && 'hidden opacity-0',
            )}
          >
            © 2026 HalfStack
          </span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar