"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Building, Calendar, Clock, CreditCard, LogOut, Menu, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  color?: string
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    color: "text-yellow-500",
  },
  {
    title: "Employees",
    href: "/dashboard/employees",
    icon: Users,
    color: "text-yellow-500",
  },
  {
    title: "Departments",
    href: "/dashboard/departments",
    icon: Building,
    color: "text-yellow-500",
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    title: "Leave Requests",
    href: "/dashboard/leave-requests",
    icon: Calendar,
    color: "text-yellow-500",
  },
  {
    title: "Salary",
    href: "/dashboard/salary",
    icon: CreditCard,
    color: "text-yellow-500",
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-yellow-600 bg-black px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden border-yellow-600 text-yellow-500 hover:bg-gray-900 hover:text-yellow-400 hover:border-yellow-400">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs bg-black border-r border-yellow-600">
            <nav className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsMobileNavOpen(false)}>
                <Users className="h-6 w-6 text-yellow-500" />
                <span className="text-yellow-500">EmpTrack</span>
              </Link>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-yellow-600/20 text-yellow-400 font-bold"
                        : "text-yellow-500 hover:bg-yellow-600/10 hover:text-yellow-400",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="mt-auto">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-900 hover:text-red-300"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Users className="h-6 w-6 text-yellow-500" />
          <span className="text-yellow-500">EmpTrack</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-yellow-500" />
            <span className="sr-only">User</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-yellow-600 bg-black md:block">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-yellow-600/20 text-yellow-400 font-bold shadow-sm"
                    : "text-yellow-500 hover:bg-yellow-600/10 hover:text-yellow-400",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-900 hover:text-red-300"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6 bg-black text-gray-200">{children}</main>
      </div>
    </div>
  )
}
