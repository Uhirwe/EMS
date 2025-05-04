package com.emp_man.ems.Service;

import com.emp_man.ems.DTOs.EmployeeDTO;
import com.emp_man.ems.Models.Employee;
import com.emp_man.ems.Models.User;
import com.emp_man.ems.Repositories.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AuthService authService;

    public EmployeeService(EmployeeRepository employeeRepository, AuthService authService) {
        this.employeeRepository = employeeRepository;
        this.authService = authService;
    }

    public List<EmployeeDTO> getAllEmployees() {
        User user = authService.getCurrentUser();
        List<Employee> employees;
        if (user.getRole().equals("HR Administrator")) {
            employees = employeeRepository.findAll();
        } else {
            employees = employeeRepository.findByUserId(user.getId());
        }
        return employees.stream()
                .map(employee -> new EmployeeDTO(
                        employee.getId(),
                        employee.getFirstname(),
                        employee.getLastname(),
                        employee.getEmail(),
                        employee.getPhone(),
                        employee.getDepartment()
                ))
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        User user = authService.getCurrentUser();
        Employee employee;
        if (user.getRole().equals("HR Administrator")) {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
        } else {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            if (!employee.getUser().getId().equals(user.getId())) {
                throw new IllegalAccessError("Unauthorized access to employee record");
            }
        }
        return new EmployeeDTO(
                employee.getId(),
                employee.getFirstname(),
                employee.getLastname(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getDepartment()
        );
    }

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        User user = authService.getCurrentUser();
        Employee employee = new Employee();
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setPhone(employeeDTO.getPhone());
        employee.setDepartment(employeeDTO.getDepartment());
        employee.setUser(user);
        Employee savedEmployee = employeeRepository.save(employee);
        return new EmployeeDTO(
                savedEmployee.getId(),
                savedEmployee.getFirstname(),
                savedEmployee.getLastname(),
                savedEmployee.getEmail(),
                savedEmployee.getPhone(),
                savedEmployee.getDepartment()
        );
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        User user = authService.getCurrentUser();
        Employee employee;
        if (user.getRole().equals("HR Administrator")) {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
        } else {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            if (!employee.getUser().getId().equals(user.getId())) {
                throw new IllegalAccessError("Unauthorized access to employee record");
            }
        }
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setPhone(employeeDTO.getPhone());
        employee.setDepartment(employeeDTO.getDepartment());
        Employee updatedEmployee = employeeRepository.save(employee);
        return new EmployeeDTO(
                updatedEmployee.getId(),
                updatedEmployee.getFirstname(),
                updatedEmployee.getLastname(),
                updatedEmployee.getEmail(),
                updatedEmployee.getPhone(),
                updatedEmployee.getDepartment()
        );
    }

    public void deleteEmployee(Long id) {
        User user = authService.getCurrentUser();
        Employee employee;
        if (user.getRole().equals("HR Administrator")) {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
        } else {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            if (!employee.getUser().getId().equals(user.getId())) {
                throw new IllegalAccessError("Unauthorized access to employee record");
            }
        }
        employeeRepository.delete(employee);
    }
}