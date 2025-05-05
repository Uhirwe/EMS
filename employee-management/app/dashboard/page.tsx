import Link from "next/link"
import { Building, Calendar, Clock, CreditCard, TrendingUp, Users, Settings } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Admin! Here&apos;s an overview of your organization.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <TrendingUp className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-green-600">+12 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600">+1 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-teal-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-green-600">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-red-500">-3 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 rounded-t-lg">
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                  <Users className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">New employee joined</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson joined Engineering</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Leave request approved</p>
                  <p className="text-xs text-muted-foreground">Michael Chen's leave request was approved</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-300">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Salary processed</p>
                  <p className="text-xs text-muted-foreground">Monthly salary for all employees processed</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                  <Building className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">New department created</p>
                  <p className="text-xs text-muted-foreground">Data Science department was created</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-blue-50 dark:from-background dark:to-blue-950/10">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/employees/new">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 transition-colors"
              >
                <Users className="mr-2 h-4 w-4 text-blue-500" />
                Add New Employee
              </Button>
            </Link>
            <Link href="/dashboard/leave-requests/new">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-300 transition-colors"
              >
                <Calendar className="mr-2 h-4 w-4 text-amber-500" />
                Create Leave Request
              </Button>
            </Link>
            <Link href="/dashboard/attendance/record">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-300 transition-colors"
              >
                <Clock className="mr-2 h-4 w-4 text-teal-500" />
                Record Attendance
              </Button>
            </Link>
            <Link href="/dashboard/salary/process">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-300 transition-colors"
              >
                <CreditCard className="mr-2 h-4 w-4 text-green-500" />
                Process Salary
              </Button>
            </Link>
            <Link href="/dashboard/departments/new">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 transition-colors"
              >
                <Building className="mr-2 h-4 w-4 text-purple-500" />
                Add New Department
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900/20 dark:hover:text-slate-300 transition-colors"
              >
                <Settings className="mr-2 h-4 w-4 text-slate-500" />
                System Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
