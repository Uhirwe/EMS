"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDown, Download, Edit, MoreHorizontal, Plus, Search } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Sample salary data
const salaryRecords = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "John Doe",
    department: "Engineering",
    position: "Senior Developer",
    basicSalary: 5000,
    allowances: 800,
    deductions: 300,
    netSalary: 5500,
    paymentDate: "2023-04-30",
    status: "Paid",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Jane Smith",
    department: "Marketing",
    position: "Marketing Manager",
    basicSalary: 4500,
    allowances: 600,
    deductions: 250,
    netSalary: 4850,
    paymentDate: "2023-04-30",
    status: "Paid",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Robert Johnson",
    department: "Finance",
    position: "Financial Analyst",
    basicSalary: 4000,
    allowances: 500,
    deductions: 200,
    netSalary: 4300,
    paymentDate: "2023-04-30",
    status: "Paid",
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Emily Davis",
    department: "Human Resources",
    position: "HR Specialist",
    basicSalary: 3800,
    allowances: 450,
    deductions: 180,
    netSalary: 4070,
    paymentDate: "2023-04-30",
    status: "Paid",
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: "Michael Chen",
    department: "Engineering",
    position: "Frontend Developer",
    basicSalary: 4200,
    allowances: 550,
    deductions: 220,
    netSalary: 4530,
    paymentDate: "2023-04-30",
    status: "Paid",
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: "Sarah Johnson",
    department: "Sales",
    position: "Sales Representative",
    basicSalary: 3500,
    allowances: 700,
    deductions: 150,
    netSalary: 4050,
    paymentDate: "2023-04-30",
    status: "Paid",
  },
  {
    id: 7,
    employeeId: 7,
    employeeName: "David Wilson",
    department: "Engineering",
    position: "Backend Developer",
    basicSalary: 4300,
    allowances: 600,
    deductions: 230,
    netSalary: 4670,
    paymentDate: "2023-04-30",
    status: "Paid",
  },
]

export default function SalaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [newRecord, setNewRecord] = useState({
    employeeName: "",
    department: "",
    position: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    paymentDate: format(new Date(), "yyyy-MM-dd"),
    status: "Pending",
  })

  const filteredRecords = salaryRecords.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRecord = () => {
    // In a real app, this would add the record to the database
    console.log("Adding salary record:", newRecord)
    setIsAddDialogOpen(false)
    setNewRecord({
      employeeName: "",
      department: "",
      position: "",
      basicSalary: "",
      allowances: "",
      deductions: "",
      paymentDate: format(new Date(), "yyyy-MM-dd"),
      status: "Pending",
    })
  }

  const handleEditRecord = () => {
    // In a real app, this would update the record in the database
    console.log("Editing salary record:", selectedRecord)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Salary Management</h2>
          <p className="text-muted-foreground">Manage employee salaries and payments</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : <span>Select month</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Salary
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Salary Record</DialogTitle>
                <DialogDescription>Add a new salary record for an employee.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeName">Employee</Label>
                    <Select
                      value={newRecord.employeeName}
                      onValueChange={(value) => setNewRecord({ ...newRecord, employeeName: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                        <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                        <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                        <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={newRecord.department}
                      onValueChange={(value) => setNewRecord({ ...newRecord, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newRecord.position}
                    onChange={(e) => setNewRecord({ ...newRecord, position: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary">Basic Salary</Label>
                    <Input
                      id="basicSalary"
                      type="number"
                      value={newRecord.basicSalary}
                      onChange={(e) => setNewRecord({ ...newRecord, basicSalary: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowances">Allowances</Label>
                    <Input
                      id="allowances"
                      type="number"
                      value={newRecord.allowances}
                      onChange={(e) => setNewRecord({ ...newRecord, allowances: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deductions">Deductions</Label>
                    <Input
                      id="deductions"
                      type="number"
                      value={newRecord.deductions}
                      onChange={(e) => setNewRecord({ ...newRecord, deductions: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Payment Date</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={newRecord.paymentDate}
                      onChange={(e) => setNewRecord({ ...newRecord, paymentDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newRecord.status}
                      onValueChange={(value) => setNewRecord({ ...newRecord, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRecord}>Add Record</Button>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Departments</DropdownMenuItem>
            <DropdownMenuItem>Engineering</DropdownMenuItem>
            <DropdownMenuItem>Marketing</DropdownMenuItem>
            <DropdownMenuItem>Finance</DropdownMenuItem>
            <DropdownMenuItem>Human Resources</DropdownMenuItem>
            <DropdownMenuItem>Sales</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Basic Salary</TableHead>
              <TableHead>Allowances</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.employeeName}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>{record.position}</TableCell>
                <TableCell>${record.basicSalary.toLocaleString()}</TableCell>
                <TableCell>${record.allowances.toLocaleString()}</TableCell>
                <TableCell>${record.deductions.toLocaleString()}</TableCell>
                <TableCell>${record.netSalary.toLocaleString()}</TableCell>
                <TableCell>{new Date(record.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      record.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {record.status}
                  </span>
                </TableCell>
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
                              setSelectedRecord(record)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Salary Record</DialogTitle>
                            <DialogDescription>Update salary information.</DialogDescription>
                          </DialogHeader>
                          {selectedRecord && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-basicSalary">Basic Salary</Label>
                                  <Input
                                    id="edit-basicSalary"
                                    type="number"
                                    defaultValue={selectedRecord.basicSalary}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-allowances">Allowances</Label>
                                  <Input id="edit-allowances" type="number" defaultValue={selectedRecord.allowances} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-deductions">Deductions</Label>
                                  <Input id="edit-deductions" type="number" defaultValue={selectedRecord.deductions} />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-paymentDate">Payment Date</Label>
                                  <Input id="edit-paymentDate" type="date" defaultValue={selectedRecord.paymentDate} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select defaultValue={selectedRecord.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pending">Pending</SelectItem>
                                      <SelectItem value="Paid">Paid</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditRecord}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Slip
                      </DropdownMenuItem>
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
