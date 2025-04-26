import { Employee } from '@/types/employee'
import { authService } from './auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...authService.getAuthHeader()
})

export const employeeApi = {
  // Get all employees
  async getAllEmployees(): Promise<Employee[]> {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      headers: getHeaders()
    })
    if (!response.ok) {
      throw new Error('Failed to fetch employees')
    }
    return response.json()
  },

  // Get a single employee by ID
  async getEmployeeById(id: number): Promise<Employee> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      headers: getHeaders()
    })
    if (!response.ok) {
      throw new Error('Failed to fetch employee')
    }
    return response.json()
  },

  // Create a new employee
  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(employee),
    })
    if (!response.ok) {
      throw new Error('Failed to create employee')
    }
    return response.json()
  },

  // Update an existing employee
  async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(employee),
    })
    if (!response.ok) {
      throw new Error('Failed to update employee')
    }
    return response.json()
  },

  // Delete an employee
  async deleteEmployee(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    if (!response.ok) {
      throw new Error('Failed to delete employee')
    }
  }
} 