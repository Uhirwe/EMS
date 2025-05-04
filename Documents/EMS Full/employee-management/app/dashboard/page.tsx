"use client"

import Link from "next/link"
import { Building, Calendar, Clock, CreditCard, TrendingUp, Users, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { employeeApi, departmentApi, attendanceApi, leaveRequestApi, salaryApi } from "@/lib/api/employee"
import { formatDistanceToNow } from "date-fns"
import { Employee, Department, Attendance, LeaveRequest, Salary } from "@/types/employee"

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface RecentActivity {
  type: 'EMPLOYEE' | 'LEAVE' | 'SALARY' | 'DEPARTMENT';
  title: string;
  description: string;
  timestamp: string;
}

export default function DashboardPage() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadDashboardData();
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Add event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all required data
      const [employees, departments, attendances, leaveRequests, salaries] = await Promise.all([
        employeeApi.getAllEmployees(),
        departmentApi.getAllDepartments(),
        attendanceApi.getAllAttendances(),
        leaveRequestApi.getAllLeaveRequests(),
        salaryApi.getAllSalaries()
      ]);

      // Calculate metrics
      setTotalEmployees(employees.length);
      setTotalDepartments(departments.length);

      // Calculate attendance rate for today
      const today = new Date().toISOString().split('T')[0];
      const todayAttendances = attendances.filter((a: Attendance) => a.date.startsWith(today));
      const presentCount = todayAttendances.filter((a: Attendance) => a.status === 'PRESENT').length;
      setAttendanceRate(todayAttendances.length > 0 ? (presentCount / todayAttendances.length) * 100 : 0);

      // Count pending leave requests
      const pendingCount = leaveRequests.filter((lr: LeaveRequest) => lr.status === 'PENDING').length;
      setPendingLeaves(pendingCount);

      // Prepare recent activities
      const activities: RecentActivity[] = [];

      // Add recent employees (using department creation date as a proxy)
      const recentEmployees = employees
        .sort((a: Employee, b: Employee) => new Date(b.department.createdDate || '').getTime() - new Date(a.department.createdDate || '').getTime())
        .slice(0, 2);
      recentEmployees.forEach((emp: Employee) => {
        activities.push({
          type: 'EMPLOYEE',
          title: 'New employee joined',
          description: `${emp.firstName} ${emp.lastName} joined ${emp.department.name}`,
          timestamp: emp.department.createdDate || new Date().toISOString()
        });
      });

      // Add recent leave requests (using start date as a proxy)
      const recentLeaves = leaveRequests
        .sort((a: LeaveRequest, b: LeaveRequest) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, 2);
      recentLeaves.forEach((leave: LeaveRequest) => {
        activities.push({
          type: 'LEAVE',
          title: 'Leave request updated',
          description: `${leave.employee.firstName} ${leave.employee.lastName}'s leave request was ${leave.status.toLowerCase()}`,
          timestamp: leave.startDate
        });
      });

      // Add recent salary processing
      const recentSalaries = salaries
        .sort((a: Salary, b: Salary) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
        .slice(0, 1);
      recentSalaries.forEach((salary: Salary) => {
        activities.push({
          type: 'SALARY',
          title: 'Salary processed',
          description: `Salary for ${salary.employee.firstName} ${salary.employee.lastName} was processed`,
          timestamp: salary.paymentDate
        });
      });

      // Add recent department changes
      const recentDepts = departments
        .sort((a: Department, b: Department) => new Date(b.createdDate || '').getTime() - new Date(a.createdDate || '').getTime())
        .slice(0, 1);
      recentDepts.forEach((dept: Department) => {
        activities.push({
          type: 'DEPARTMENT',
          title: 'Department updated',
          description: `${dept.name} department was updated`,
          timestamp: dept.createdDate || new Date().toISOString()
        });
      });

      // Sort all activities by timestamp and take the most recent 4
      const sortedActivities = activities
        .sort((a: RecentActivity, b: RecentActivity) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 4);

      setRecentActivities(sortedActivities);

    } catch (error: any) {
      console.error("Failed to load dashboard data:", error);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'EMPLOYEE':
        return <Users className="h-4 w-4" />;
      case 'LEAVE':
        return <Calendar className="h-4 w-4" />;
      case 'SALARY':
        return <CreditCard className="h-4 w-4" />;
      case 'DEPARTMENT':
        return <Building className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'EMPLOYEE':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300';
      case 'LEAVE':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300';
      case 'SALARY':
        return 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300';
      case 'DEPARTMENT':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            {user ? `Welcome back, ${user.firstName} ${user.lastName}!` : 'Welcome back!'} Here&apos;s an overview of your organization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={loadDashboardData}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <span className="sr-only">Dismiss</span>
            <span className="text-xl">×</span>
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
            ) : (
              <div className="text-2xl font-bold">{totalEmployees}</div>
            )}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
            ) : (
              <div className="text-2xl font-bold">{totalDepartments}</div>
            )}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-teal-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
            ) : (
              <div className="text-2xl font-bold">{attendanceRate.toFixed(1)}%</div>
            )}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
            ) : (
              <div className="text-2xl font-bold">{pendingLeaves}</div>
            )}
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
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="animate-pulse rounded-full h-8 w-8 bg-gray-200"></div>
                    <div className="space-y-2 flex-1">
                      <div className="animate-pulse h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="animate-pulse h-3 w-32 bg-gray-200 rounded"></div>
                      <div className="animate-pulse h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No recent activities to show
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-t-lg">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Link href="/dashboard/employees">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Employees
                </Button>
              </Link>
              <Link href="/dashboard/departments">
                <Button variant="outline" className="w-full justify-start">
                  <Building className="mr-2 h-4 w-4" />
                  Manage Departments
                </Button>
              </Link>
              <Link href="/dashboard/attendance">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Manage Attendance
                </Button>
              </Link>
              <Link href="/dashboard/leave-requests">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Leave Requests
                </Button>
              </Link>
              <Link href="/dashboard/salary">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Salary
                </Button>
              </Link>
             
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
