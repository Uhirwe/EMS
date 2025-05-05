"use client"

import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"

// Sample department data
const departments = [
  {
    id: 1,
    name: "Engineering",
    manager: "John Doe",
    employeeCount: 45,
    description: "Software development and technical operations",
    createdAt: "2020-01-15",
  },
  {
    id: 2,
    name: "Marketing",
    manager: "Jane Smith",
    employeeCount: 18,
    description: "Brand management and marketing campaigns",
    createdAt: "2020-02-20",
  },
  {
    id: 3,
    name: "Finance",
    manager: "Robert Johnson",
    employeeCount: 12,
    description: "Financial planning and accounting",
    createdAt: "2020-03-10",
  },
  {
    id: 4,
    name: "Human Resources",
    manager: "Emily Davis",
    employeeCount: 8,
    description: "Employee management and recruitment",
    createdAt: "2020-04-05",
  },
  {
    id: 5,
    name: "Sales",
    manager: "Michael Chen",
    employeeCount: 22,
    description: "Sales operations and client relationships",
    createdAt: "2020-05-15",
  },
]

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    manager: "",
    description: "",
  })

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddDepartment = () => {
    // In a real app, this would add the department to the database
    console.log("Adding department:", newDepartment)
    setIsAddDialogOpen(false)
    setNewDepartment({
      name: "",
      manager: "",
      description: "",
    })
  }

  const handleEditDepartment = () => {
    // In a real app, this would update the department in the database
    console.log("Editing department:", selectedDepartment)
    setIsEditDialogOpen(false)
  }

  const handleDeleteDepartment = () => {
    // In a real app, this would delete the department from the database
    console.log("Deleting department:", selectedDepartment)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground">Manage your organization&apos;s departments</p>
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
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>Fill in the details to add a new department to your organization.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name</Label>
                  <Input
                    id="name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Department Manager</Label>
                  <Input
                    id="manager"
                    value={newDepartment.manager}
                    onChange={(e) => setNewDepartment({ ...newDepartment, manager: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDepartment}>Add Department</Button>
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
            placeholder="Search departments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
            <DropdownMenuItem>Employee Count (High-Low)</DropdownMenuItem>
            <DropdownMenuItem>Employee Count (Low-High)</DropdownMenuItem>
            <DropdownMenuItem>Date Created (Newest)</DropdownMenuItem>
            <DropdownMenuItem>Date Created (Oldest)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department Name</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.manager}</TableCell>
                <TableCell>{department.employeeCount}</TableCell>
                <TableCell className="max-w-xs truncate">{department.description}</TableCell>
                <TableCell>{new Date(department.createdAt).toLocaleDateString()}</TableCell>
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
                              setSelectedDepartment(department)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Department</DialogTitle>
                            <DialogDescription>Update department information.</DialogDescription>
                          </DialogHeader>
                          {selectedDepartment && (
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Department Name</Label>
                                <Input id="edit-name" defaultValue={selectedDepartment.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-manager">Department Manager</Label>
                                <Input id="edit-manager" defaultValue={selectedDepartment.manager} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea id="edit-description" defaultValue={selectedDepartment.description} />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditDepartment}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault()
                              setSelectedDepartment(department)
                            }}
                            className="text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Department</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this department? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          {selectedDepartment && (
                            <div className="py-4">
                              <p>
                                You are about to delete <strong>{selectedDepartment.name}</strong> department with{" "}
                                {selectedDepartment.employeeCount} employees.
                              </p>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Note: Employees in this department will need to be reassigned.
                              </p>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteDepartment}>
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
