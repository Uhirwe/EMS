package com.emp_man.ems.Repositories;

import com.emp_man.ems.Models.Salary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
    List<Salary> findByUserId(Long userId);
}