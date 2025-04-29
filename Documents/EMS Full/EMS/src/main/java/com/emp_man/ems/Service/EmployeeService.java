package com.emp_man.ems.Service;

import com.emp_man.ems.Models.Employee;
import com.emp_man.ems.Repositories.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentService departmentService;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentService departmentService) {
        this.employeeRepository = employeeRepository;
        this.departmentService = departmentService;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee createEmployee(Employee employee) {
        Employee savedEmployee = employeeRepository.save(employee);
        // Update department's employeeCount
        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            departmentService.updateEmployeeCount(employee.getDepartment().getId(), 1);
        }
        return savedEmployee;
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = getEmployeeById(id);
        Long oldDepartmentId = employee.getDepartment() != null ? employee.getDepartment().getId() : null;
        Long newDepartmentId = employeeDetails.getDepartment() != null ? employeeDetails.getDepartment().getId() : null;

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setPhone(employeeDetails.getPhone());
        employee.setDepartment(employeeDetails.getDepartment());

        Employee updatedEmployee = employeeRepository.save(employee);

        // Update department employee counts
        if (oldDepartmentId != null && !oldDepartmentId.equals(newDepartmentId)) {
            departmentService.updateEmployeeCount(oldDepartmentId, -1); // Decrease old department
        }
        if (newDepartmentId != null) {
            departmentService.updateEmployeeCount(newDepartmentId, 1); // Increase new department
        }

        return updatedEmployee;
    }

    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        Long departmentId = employee.getDepartment() != null ? employee.getDepartment().getId() : null;
        employeeRepository.delete(employee);
        // Update department's employeeCount
        if (departmentId != null) {
            departmentService.updateEmployeeCount(departmentId, -1);
        }
    }
}