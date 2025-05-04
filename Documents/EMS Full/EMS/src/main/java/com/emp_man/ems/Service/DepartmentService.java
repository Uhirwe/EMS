package com.emp_man.ems.Service;

import com.emp_man.ems.Models.Department;
import com.emp_man.ems.Models.User;
import com.emp_man.ems.Repositories.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final AuthService authService;

    public DepartmentService(DepartmentRepository departmentRepository, AuthService authService) {
        this.departmentRepository = departmentRepository;
        this.authService = authService;
    }

    public List<Department> getAllDepartments() {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return departmentRepository.findAll();
        }
        return departmentRepository.findByUserId(user.getId());
    }

    public Department getDepartmentById(Long id) {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return departmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        }
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        if (!department.getUser().getId().equals(user.getId())) {
            throw new IllegalAccessError("Unauthorized access to department record");
        }
        return department;
    }

    public Department createDepartment(Department department) {
        User user = authService.getCurrentUser();
        department.setUser(user);
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Department department = getDepartmentById(id); // Ensures user owns the record or is admin
        department.setName(departmentDetails.getName());
        department.setManager(departmentDetails.getManager());
        department.setDescription(departmentDetails.getDescription());
        department.setEmployeeCount(departmentDetails.getEmployeeCount());
        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        Department department = getDepartmentById(id); // Ensures user owns the record or is admin
        departmentRepository.delete(department);
    }

    public void updateEmployeeCount(Long departmentId, int countChange) {
        Department department = getDepartmentById(departmentId); // Ensures user owns the record or is admin
        int newCount = department.getEmployeeCount() + countChange;
        if (newCount < 0) {
            newCount = 0; // Make sure it doesn't go below zero
        }
        department.setEmployeeCount(newCount);
        departmentRepository.save(department);
    }

//    public void incrementEmployeeCount(Long departmentId) {
//        Department department = getDepartmentById(departmentId); // Ensures user owns the record or is admin
//        department.setEmployeeCount(department.getEmployeeCount() + 1);
//        departmentRepository.save(department);
//    }
//
//    public void decrementEmployeeCount(Long departmentId) {
//        Department department = getDepartmentById(departmentId); // Ensures user owns the record or is admin
//        if (department.getEmployeeCount() > 0) {
//            department.setEmployeeCount(department.getEmployeeCount() - 1);
//            departmentRepository.save(department);
//        }
//    }
}