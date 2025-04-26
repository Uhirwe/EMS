"use client"

import { useState } from "react"
import { Check, ChevronDown, Download, Edit, MoreHorizontal, Plus, Search, X } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

// Sample leave request data
const leaveRequests = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "John Doe",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2023-05-15",
    endDate: "2023-05-20",
    days: 6,
    reason: "Family vacation",
    status: "Approved",
    appliedOn: "2023-04-20",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Jane Smith",
    department: "Marketing",
    leaveType: "Sick Leave",
    startDate: "2023-05-10",
    endDate: "2023-05-12",
    days: 3,
    reason: "Medical appointment",
    status: "Approved",
    appliedOn: "2023-05-08",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Robert Johnson",
    department: "Finance",
    leaveType: "Annual Leave",
    startDate: "2023-06-01",
    endDate: "2023-06-10",
    days: 10,
    reason: "Summer vacation",
    status: "Pending",
    appliedOn: "2023-05-01",
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Emily Davis",
    department: "Human Resources",
    leaveType: "Maternity Leave",
    startDate: "2023-07-01",
    endDate: "2023-10-01",
    days: 92,
    reason: "Maternity leave",
    status: "Approved",
    appliedOn: "2023-04-15",
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: "Michael Chen",
    department: "Engineering",
    leaveType: "Sick Leave",
    startDate: "2023-05-05",
    endDate: "2023-05-05",
    days: 1,
    reason: "Not feeling well",
    status: "Rejected",
    appliedOn: "2023-05-04",
  },
]

export default function LeaveRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [newRequest, setNewRequest] = useState({
    employeeName: "",
    department: "",
    leaveType: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    reason: "",
  })

  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRequest = () => {
    // In a real app, this would add the request to the database
    console.log("Adding leave request:", newRequest)
    setIsAddDialogOpen(false)
    setNewRequest({
      employeeName: "",
      department: "",
      leaveType: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      reason: "",
    })
  }

  const handleEditRequest = () => {
    // In a real app, this would update the request in the database
    console.log("Editing leave request:", selectedRequest)
    setIsEditDialogOpen(false)
  }

  const handleApproveRequest = (request: any) => {
    // In a real app, this would update the request status in the database
    console.log("Approving leave request:", request)
  }

  const handleRejectRequest = (request: any) => {
    // In a real app, this would update the request status in the database
    console.log("Rejecting leave request:", request)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leave Requests</h2>
          <p className="text-muted-foreground">Manage employee leave requests</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Leave Request</DialogTitle>
                <DialogDescription>Submit a new leave request for an employee.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeName">Employee</Label>
                    <Select
                      value={newRequest.employeeName}
                      onValueChange={(value) => setNewRequest({ ...newRequest, employeeName: value })}
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
                      value={newRequest.department}
                      onValueChange={(value) => setNewRequest({ ...newRequest, department: value })}
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
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <Select
                    value={newRequest.leaveType}
                    onValueChange={(value) => setNewRequest({ ...newRequest, leaveType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                      <SelectItem value="Paternity Leave">Paternity Leave</SelectItem>
                      <SelectItem value="Unpaid Leave">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRequest}>Submit Request</Button>
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
            placeholder="Search leave requests..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Statuses</DropdownMenuItem>
            <DropdownMenuItem>Pending</DropdownMenuItem>
            <DropdownMenuItem>Approved</DropdownMenuItem>
            <DropdownMenuItem>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.employeeName}</TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>{request.leaveType}</TableCell>
                <TableCell>
                  {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{request.days}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(request.appliedOn).toLocaleDateString()}</TableCell>
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
                              setSelectedRequest(request)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Leave Request</DialogTitle>
                            <DialogDescription>Update leave request information.</DialogDescription>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-leaveType">Leave Type</Label>
                                <Select defaultValue={selectedRequest.leaveType}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                                    <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                                    <SelectItem value="Paternity Leave">Paternity Leave</SelectItem>
                                    <SelectItem value="Unpaid Leave">Unpaid Leave</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-startDate">Start Date</Label>
                                  <Input id="edit-startDate" type="date" defaultValue={selectedRequest.startDate} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-endDate">End Date</Label>
                                  <Input id="edit-endDate" type="date" defaultValue={selectedRequest.endDate} />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-reason">Reason</Label>
                                <Textarea id="edit-reason" defaultValue={selectedRequest.reason} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <Select defaultValue={selectedRequest.status}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditRequest}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      {request.status === "Pending" && (
                        <>
                          <DropdownMenuItem onClick={() => handleApproveRequest(request)}>
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                            <span className="text-green-600">Approve</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRejectRequest(request)}>
                            <X className="mr-2 h-4 w-4 text-red-600" />
                            <span className="text-red-600">Reject</span>
                          </DropdownMenuItem>
                        </>
                      )}
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
