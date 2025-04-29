package com.emp_man.ems.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import java.time.LocalDate;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String manager;
    private String description;
    private LocalDate createdDate;
    private int employeeCount;  // NEW FIELD

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDate.now();
        this.employeeCount = 0; // Initialize employee count to 0 on department creation
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getManager() {
        return manager;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public int getEmployeeCount() {
        return employeeCount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEmployeeCount(int employeeCount) {
        this.employeeCount = employeeCount;
    }
}
