package com.emp_man.ems.Service;

import com.emp_man.ems.Models.Salary;
import com.emp_man.ems.Repositories.SalaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryService {

    private final SalaryRepository salaryRepository;

    public SalaryService(SalaryRepository salaryRepository) {
        this.salaryRepository = salaryRepository;
    }

    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }

    public Salary getSalaryById(Long id) {
        return salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found"));
    }

    public Salary createSalary(Salary salary) {
        return salaryRepository.save(salary);
    }

    public Salary updateSalary(Long id, Salary salaryDetails) {
        Salary salary = getSalaryById(id);
        salary.setEmployee(salaryDetails.getEmployee());
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
        Salary salary = getSalaryById(id);
        salaryRepository.delete(salary);
    }
}