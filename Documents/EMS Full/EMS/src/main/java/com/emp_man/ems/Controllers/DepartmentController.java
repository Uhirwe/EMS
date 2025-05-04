package com.emp_man.ems.Controllers;

import com.emp_man.ems.Models.Department;
import com.emp_man.ems.Service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Department department = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(department);
    }

    @PostMapping
    public ResponseEntity<?> createDepartment(@RequestBody Department department) {
        try {
            if (department.getName() == null || department.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Department name is required");
            }
            if (department.getManager() == null || department.getManager().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Department manager is required");
            }
            Department createdDepartment = departmentService.createDepartment(department);
            return ResponseEntity.ok(createdDepartment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating department: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDepartment(@PathVariable Long id, @RequestBody Department departmentDetails) {
        try {
            if (departmentDetails.getName() == null || departmentDetails.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Department name is required");
            }
            if (departmentDetails.getManager() == null || departmentDetails.getManager().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Department manager is required");
            }
            Department updatedDepartment = departmentService.updateDepartment(id, departmentDetails);
            return ResponseEntity.ok(updatedDepartment);
        } catch (IllegalAccessError e) {
            return ResponseEntity.status(403).body("Unauthorized access to department record");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating department: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long id) {
        try {
            departmentService.deleteDepartment(id);
            return ResponseEntity.ok("Department deleted successfully");
        } catch (IllegalAccessError e) {
            return ResponseEntity.status(403).body("Unauthorized access to department record");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting department: " + e.getMessage());
        }
    }
}