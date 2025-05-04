package com.emp_man.ems.Models;

import jakarta.persistence.*;

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
    private int employeeCount;
    // NEW FIELD
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
