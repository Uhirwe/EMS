"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Download, Edit, MoreHorizontal, Plus, Search, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { employeeApi } from "@/lib/api/employee"
import { Employee } from "@/types/employee"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: { id: 1, name: "Engineering" } // Default department
  })

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    try {
      const data = await employeeApi.getAllEmployees()
      setEmployees(data)
    } catch (error) {
      console.error('Failed to load employees:', error)
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEmployee = async () => {
    try {
      await employeeApi.createEmployee(newEmployee)
      await loadEmployees()
      setIsAddDialogOpen(false)
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: { id: 1, name: "Engineering" }
      })
    } catch (error) {
      console.error('Failed to add employee:', error)
    }
  }

  const handleEditEmployee = async () => {
    if (!selectedEmployee) return
    
    try {
      await employeeApi.updateEmployee(selectedEmployee.id, selectedEmployee)
      await loadEmployees()
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Failed to update employee:', error)
    }
  }

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return
    
    try {
      await employeeApi.deleteEmployee(selectedEmployee.id)
      await loadEmployees()
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Failed to delete employee:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">Manage your organization&apos;s employees</p>
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
                  <Input
                    id="department"
                    value={newEmployee.department.name}
                    onChange={(e) => setNewEmployee({
                      ...newEmployee,
                      department: { ...newEmployee.department, name: e.target.value }
                    })}
                  />
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
      </div>

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
            {filteredEmployees.map((employee) => (
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
                              e.preventDefault()
                              setSelectedEmployee(employee)
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
                                    onChange={(e) => setSelectedEmployee({
                                      ...selectedEmployee,
                                      firstName: e.target.value
                                    })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-lastName">Last Name</Label>
                                  <Input
                                    id="edit-lastName"
                                    value={selectedEmployee.lastName}
                                    onChange={(e) => setSelectedEmployee({
                                      ...selectedEmployee,
                                      lastName: e.target.value
                                    })}
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
                                    onChange={(e) => setSelectedEmployee({
                                      ...selectedEmployee,
                                      email: e.target.value
                                    })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-phone">Phone</Label>
                                  <Input
                                    id="edit-phone"
                                    value={selectedEmployee.phone}
                                    onChange={(e) => setSelectedEmployee({
                                      ...selectedEmployee,
                                      phone: e.target.value
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-department">Department</Label>
                                <Input
                                  id="edit-department"
                                  value={selectedEmployee.department.name}
                                  onChange={(e) => setSelectedEmployee({
                                    ...selectedEmployee,
                                    department: {
                                      ...selectedEmployee.department,
                                      name: e.target.value
                                    }
                                  })}
                                />
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
                              e.preventDefault()
                              setSelectedEmployee(employee)
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
                                You are about to delete <strong>{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</strong>.
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
