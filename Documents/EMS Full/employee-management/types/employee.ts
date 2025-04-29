// src/types/employee.ts
export interface Department {
  id: number;
  name: string;
  manager: string;
  description?: string;
  employeeCount: number;
  createdDate?: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: Department;
}