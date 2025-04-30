"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Download, Edit, MoreHorizontal, Plus, Search, Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { employeeApi, departmentApi } from "@/lib/api/employee";
import { Employee, Department } from "@/types/employee";

export default function EmployeesPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Engineering", manager: "John Doe", createdDate: new Date().toISOString().split('T')[0], employeeCount: 0 },
    { id: 2, name: "Human Resources", manager: "Jane Smith", createdDate: new Date().toISOString().split('T')[0], employeeCount: 0 },
    { id: 3, name: "Software Engineering", manager: "Mike Johnson", createdDate: new Date().toISOString().split('T')[0], employeeCount: 0 }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: departments[0],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const employeeData = await employeeApi.getAllEmployees();
      setEmployees(employeeData);
    } catch (error: any) {
      console.error("Failed to load data:", error);
      if (error.message?.includes("401")) {
        setError("Authentication required. Please log in.");
        router.push("/auth/login");
      } else {
        setError("Failed to load data. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddEmployee = async () => {
    try {
      await employeeApi.createEmployee({
        ...newEmployee,
        department: { 
          id: newEmployee.department.id,
          name: newEmployee.department.name,
          manager: newEmployee.department.manager,
          createdDate: newEmployee.department.createdDate,
          employeeCount: newEmployee.department.employeeCount
        },
      });
      await loadData();
      setIsAddDialogOpen(false);
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: departments[0],
      });
    } catch (error: any) {
      console.error("Failed to add employee:", error);
      if (error.message?.includes("401")) {
        setError("Authentication required. Please log in.");
        router.push("/auth/login");
      } else {
        setError("Failed to add employee. Please try again later.");
      }
    }
  };

  const handleEditEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      await employeeApi.updateEmployee(selectedEmployee.id, {
        ...selectedEmployee,
        department: { 
          id: selectedEmployee.department.id,
          name: selectedEmployee.department.name,
          manager: selectedEmployee.department.manager,
          createdDate: selectedEmployee.department.createdDate,
          employeeCount: selectedEmployee.department.employeeCount
        },
      });
      await loadData();
      setIsEditDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to update employee:", error);
      if (error.message?.includes("401")) {
        setError("Authentication required. Please log in.");
        router.push("/auth/login");
      } else {
        setError("Failed to update employee. Please try again later.");
      }
    }
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      await employeeApi.deleteEmployee(selectedEmployee.id);
      await loadData();
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to delete employee:", error);
      if (error.message?.includes("401")) {
        setError("Authentication required. Please log in.");
        router.push("/auth/login");
      } else {
        setError("Failed to delete employee. Please try again later.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">Manage your organization's employees</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>Fill in the details to add a new employee to your organization.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={newEmployee.firstName}
                      onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newEmployee.lastName}
                      onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <select
                    id="department"
                    value={newEmployee.department.id}
                    onChange={(e) => {
                      const dept = departments.find((d) => d.id === Number(e.target.value));
                      setNewEmployee({
                        ...newEmployee,
                        department: dept ? { 
                          id: dept.id, 
                          name: dept.name,
                          manager: dept.manager,
                          createdDate: dept.createdDate,
                          employeeCount: dept.employeeCount
                        } : { id: 0, name: "", manager: "", createdDate: new Date().toISOString().split('T')[0], employeeCount: 0 },
                      });
                    }}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select a department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name} ({dept.description}, {dept.employeeCount} employees, Created: {dept.createdDate})
                        {dept.manager ? ` - Managed by ${dept.manager}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEmployee} className="bg-blue-600 hover:bg-blue-700">
                  Add Employee
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={loadData} disabled={isLoading}>
          Refresh
        </Button>
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {searchTerm ? "No employees match your search criteria." : "No employees found. Add some employees to get started."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{`${employee.firstName} ${employee.lastName}`}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.department.name}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  setSelectedEmployee(employee);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Employee</DialogTitle>
                                <DialogDescription>Update employee information.</DialogDescription>
                              </DialogHeader>
                              {selectedEmployee && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-firstName">First Name</Label>
                                      <Input
                                        id="edit-firstName"
                                        value={selectedEmployee.firstName}
                                        onChange={(e) =>
                                          setSelectedEmployee({
                                            ...selectedEmployee,
                                            firstName: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-lastName">Last Name</Label>
                                      <Input
                                        id="edit-lastName"
                                        value={selectedEmployee.lastName}
                                        onChange={(e) =>
                                          setSelectedEmployee({
                                            ...selectedEmployee,
                                            lastName: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-email">Email</Label>
                                      <Input
                                        id="edit-email"
                                        type="email"
                                        value={selectedEmployee.email}
                                        onChange={(e) =>
                                          setSelectedEmployee({
                                            ...selectedEmployee,
                                            email: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-phone">Phone</Label>
                                      <Input
                                        id="edit-phone"
                                        value={selectedEmployee.phone}
                                        onChange={(e) =>
                                          setSelectedEmployee({
                                            ...selectedEmployee,
                                            phone: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-department">Department</Label>
                                    <select
                                      id="edit-department"
                                      value={selectedEmployee.department.id}
                                      onChange={(e) => {
                                        const dept = departments.find((d) => d.id === Number(e.target.value));
                                        setSelectedEmployee({
                                          ...selectedEmployee,
                                          department: dept ? { 
                                            id: dept.id, 
                                            name: dept.name,
                                            manager: dept.manager,
                                            createdDate: dept.createdDate,
                                            employeeCount: dept.employeeCount
                                          } : { id: 0, name: "", manager: "", createdDate: new Date().toISOString().split('T')[0], employeeCount: 0 },
                                        });
                                      }}
                                      className="w-full border rounded p-2"
                                    >
                                      <option value="">Select a department</option>
                                      {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                          {dept.name} ({dept.description}, {dept.employeeCount} employees, Created: {dept.createdDate})
                                          {dept.manager ? ` - Managed by ${dept.manager}` : ""}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditEmployee} className="bg-blue-600 hover:bg-blue-700">
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  setSelectedEmployee(employee);
                                }}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Employee</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this employee? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedEmployee && (
                                <div className="py-4">
                                  <p>
                                    You are about to delete{" "}
                                    <strong>{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</strong>.
                                  </p>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDeleteEmployee}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}