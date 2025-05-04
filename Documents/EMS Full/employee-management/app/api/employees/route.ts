import { NextResponse } from 'next/server'
import { Employee, Department } from '@/types/employee'

// In a real application, this would be replaced with a database
let employees: Employee[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    department: {
      id: 1,
      name: "Engineering",
      manager: "Mike Johnson",
      employeeCount: 5,
      createdDate: new Date().toISOString().split('T')[0]
    }
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    department: {
      id: 2,
      name: "Human Resources",
      manager: "Sarah Wilson",
      employeeCount: 3,
      createdDate: new Date().toISOString().split('T')[0]
    }
  }
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