package com.emp_man.ems.Service;

import com.emp_man.ems.Models.Department;
import com.emp_man.ems.Repositories.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Department department = getDepartmentById(id);
        department.setName(departmentDetails.getName());
        department.setManager(departmentDetails.getManager());
        department.setDescription(departmentDetails.getDescription());
        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        Department department = getDepartmentById(id);
        departmentRepository.delete(department);
    }
    public void updateEmployeeCount(Long departmentId, int countChange) {
        Department department = getDepartmentById(departmentId);
        int newCount = department.getEmployeeCount() + countChange;
        if (newCount < 0) {
            newCount = 0; // Make sure it doesn't go below zero
        }
        department.setEmployeeCount(newCount);
        departmentRepository.save(department);
    }
    public void incrementEmployeeCount(Long departmentId) {
        Department department = getDepartmentById(departmentId);
        department.setEmployeeCount(department.getEmployeeCount() + 1);
        departmentRepository.save(department);
    }

    public void decrementEmployeeCount(Long departmentId) {
        Department department = getDepartmentById(departmentId);
        if (department.getEmployeeCount() > 0) {
            department.setEmployeeCount(department.getEmployeeCount() - 1);
            departmentRepository.save(department);
        }
    }
}
