export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  department: Department
}

export interface Department {
  id: number
  name: string
} 