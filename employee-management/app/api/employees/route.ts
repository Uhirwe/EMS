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

export async function GET() {
  return NextResponse.json(employees)
}

export async function POST(request: Request) {
  const newEmployee: Omit<Employee, 'id'> = await request.json()
  const id = Math.max(...employees.map(e => e.id)) + 1
  const employee: Employee = { ...newEmployee, id }
  employees.push(employee)
  return NextResponse.json(employee, { status: 201 })
} 