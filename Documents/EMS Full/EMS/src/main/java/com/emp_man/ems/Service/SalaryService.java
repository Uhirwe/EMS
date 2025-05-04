package com.emp_man.ems.Service;

import com.emp_man.ems.Models.Salary;
import com.emp_man.ems.Models.User;
import com.emp_man.ems.Repositories.SalaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryService {

    private final SalaryRepository salaryRepository;
    private final AuthService authService;

    public SalaryService(SalaryRepository salaryRepository, AuthService authService) {
        this.salaryRepository = salaryRepository;
        this.authService = authService;
    }

    public List<Salary> getAllSalaries() {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return salaryRepository.findAll();
        }
        return salaryRepository.findByUserId(user.getId());
    }

    public Salary getSalaryById(Long id) {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return salaryRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Salary not found"));
        }
        Salary salary = salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found"));
        if (!salary.getUser().getId().equals(user.getId())) {
            throw new IllegalAccessError("Unauthorized access to salary record");
        }
        return salary;
    }

    public Salary createSalary(Salary salary) {
        User user = authService.getCurrentUser();
        salary.setUser(user);
        return salaryRepository.save(salary);
    }

    public Salary updateSalary(Long id, Salary salaryDetails) {
        Salary salary = getSalaryById(id); // Ensures user owns the record or is admin
        salary.setUser(salaryDetails.getUser());
        salary.setDepartment(salaryDetails.getDepartment());
        salary.setBasicSalary(salaryDetails.getBasicSalary());
        salary.setAllowances(salaryDetails.getAllowances());
        salary.setDeductions(salaryDetails.getDeductions());
        salary.setNetSalary(salaryDetails.getNetSalary());
        salary.setPaymentDate(salaryDetails.getPaymentDate());
        salary.setStatus(salaryDetails.getStatus());
        return salaryRepository.save(salary);
    }

    public void deleteSalary(Long id) {
        Salary salary = getSalaryById(id); // Ensures user owns the record or is admin
        salaryRepository.delete(salary);
    }
}