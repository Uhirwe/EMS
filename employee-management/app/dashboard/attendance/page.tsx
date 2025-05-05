"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDown, Download, Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"

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

// Sample attendance data
const attendanceRecords = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "John Doe",
    department: "Engineering",
    date: "2023-05-01",
    checkIn: "09:00",
    checkOut: "17:30",
    status: "Present",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Jane Smith",
    department: "Marketing",
    date: "2023-05-01",
    checkIn: "08:45",
    checkOut: "17:15",
    status: "Present",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Robert Johnson",
    department: "Finance",
    date: "2023-05-01",
    checkIn: "09:15",
    checkOut: "18:00",
    status: "Present",
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Emily Davis",
    department: "Human Resources",
    date: "2023-05-01",
    checkIn: "",
    checkOut: "",
    status: "Absent",
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: "Michael Chen",
    department: "Engineering",
    date: "2023-05-01",
    checkIn: "09:30",
    checkOut: "16:45",
    status: "Present",
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: "Sarah Johnson",
    department: "Sales",
    date: "2023-05-01",
    checkIn: "08:30",
    checkOut: "17:00",
    status: "Present",
  },
  {
    id: 7,
    employeeId: 7,
    employeeName: "David Wilson",
    department: "Engineering",
    date: "2023-05-01",
    checkIn: "",
    checkOut: "",
    status: "On Leave",
  },
]

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [newRecord, setNewRecord] = useState({
    employeeName: "",
    department: "",
    date: format(new Date(), "yyyy-MM-dd"),
    checkIn: "",
    checkOut: "",
    status: "Present",
  })

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRecord = () => {
    // In a real app, this would add the record to the database
    console.log("Adding attendance record:", newRecord)
    setIsAddDialogOpen(false)
    setNewRecord({
      employeeName: "",
      department: "",
      date: format(new Date(), "yyyy-MM-dd"),
      checkIn: "",
      checkOut: "",
      status: "Present",
    })
  }

  const handleEditRecord = () => {
    // In a real app, this would update the record in the database
    console.log("Editing attendance record:", selectedRecord)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground">Track and manage employee attendance</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
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
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Attendance Record</DialogTitle>
                <DialogDescription>Add a new attendance record for an employee.</DialogDescription>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
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
                        <SelectItem value="Present">Present</SelectItem>
                        <SelectItem value="Absent">Absent</SelectItem>
                        <SelectItem value="Late">Late</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check In</Label>
                    <Input
                      id="checkIn"
                      type="time"
                      value={newRecord.checkIn}
                      onChange={(e) => setNewRecord({ ...newRecord, checkIn: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check Out</Label>
                    <Input
                      id="checkOut"
                      type="time"
                      value={newRecord.checkOut}
                      onChange={(e) => setNewRecord({ ...newRecord, checkOut: e.target.value })}
                    />
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
            <DropdownMenuItem>All Statuses</DropdownMenuItem>
            <DropdownMenuItem>Present</DropdownMenuItem>
            <DropdownMenuItem>Absent</DropdownMenuItem>
            <DropdownMenuItem>Late</DropdownMenuItem>
            <DropdownMenuItem>On Leave</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.employeeName}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>{record.checkIn || "-"}</TableCell>
                <TableCell>{record.checkOut || "-"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      record.status === "Present"
                        ? "bg-green-100 text-green-800"
                        : record.status === "Absent"
                          ? "bg-red-100 text-red-800"
                          : record.status === "Late"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
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
                            <DialogTitle>Edit Attendance Record</DialogTitle>
                            <DialogDescription>Update attendance information.</DialogDescription>
                          </DialogHeader>
                          {selectedRecord && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-date">Date</Label>
                                  <Input id="edit-date" type="date" defaultValue={selectedRecord.date} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select defaultValue={selectedRecord.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Present">Present</SelectItem>
                                      <SelectItem value="Absent">Absent</SelectItem>
                                      <SelectItem value="Late">Late</SelectItem>
                                      <SelectItem value="On Leave">On Leave</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-checkIn">Check In</Label>
                                  <Input id="edit-checkIn" type="time" defaultValue={selectedRecord.checkIn} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-checkOut">Check Out</Label>
                                  <Input id="edit-checkOut" type="time" defaultValue={selectedRecord.checkOut} />
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
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
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
