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