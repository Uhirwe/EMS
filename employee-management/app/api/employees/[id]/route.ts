import { NextResponse } from 'next/server'
import { Employee } from '@/types/employee'

// In a real application, this would be replaced with a database
let employees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "2021-05-12",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "2020-03-15",
    status: "Active",
  },
  // Add more sample data as needed
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const employee = employees.find(e => e.id === id)
  
  if (!employee) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
  }
  
  return NextResponse.json(employee)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const updatedEmployee: Partial<Employee> = await request.json()
  
  const index = employees.findIndex(e => e.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
  }
  
  employees[index] = { ...employees[index], ...updatedEmployee }
  return NextResponse.json(employees[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const index = employees.findIndex(e => e.id === id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
  }
  
  employees.splice(index, 1)
  return NextResponse.json({ message: 'Employee deleted successfully' })
} 