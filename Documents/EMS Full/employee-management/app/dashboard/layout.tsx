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
    color: "text-blue-500",
  },
  {
    title: "Employees",
    href: "/dashboard/employees",
    icon: Users,
    color: "text-indigo-500",
  },
  {
    title: "Departments",
    href: "/dashboard/departments",
    icon: Building,
    color: "text-purple-500",
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: Clock,
    color: "text-teal-500",
  },
  {
    title: "Leave Requests",
    href: "/dashboard/leave-requests",
    icon: Calendar,
    color: "text-amber-500",
  },
  {
    title: "Salary",
    href: "/dashboard/salary",
    icon: CreditCard,
    color: "text-green-500",
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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs">
            <nav className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsMobileNavOpen(false)}>
                <Users className="h-6 w-6 text-purple-600" />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  EmpowerHR
                </span>
              </Link>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                      item.color,
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
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-300"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Users className="h-6 w-6 text-purple-600" />
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">EmpowerHR</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-slate-600" />
            <span className="sr-only">User</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-700 shadow-sm"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className={cn("h-5 w-5", item.color)} />
                <span className={pathname === item.href ? item.color : ""}>{item.title}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-300"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
