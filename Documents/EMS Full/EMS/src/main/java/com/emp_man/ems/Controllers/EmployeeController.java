package com.emp_man.ems.Controllers;

import com.emp_man.ems.Models.Department;
import com.emp_man.ems.Models.Employee;
import com.emp_man.ems.Service.DepartmentService;
import com.emp_man.ems.Service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final DepartmentService departmentService;

    public EmployeeController(EmployeeService employeeService, DepartmentService departmentService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        try {
            if (employee.getDepartment() == null || employee.getDepartment().getId() == null) {
                return ResponseEntity.badRequest().body("Department ID is required");
            }
            Long departmentID = employee.getDepartment().getId();
            Department department = departmentService.getDepartmentById(departmentID);
            employee.setDepartment(department);
            Employee createdEmployee = employeeService.createEmployee(employee);
            return ResponseEntity.ok(createdEmployee);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating employee: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}