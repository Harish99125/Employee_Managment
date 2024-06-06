package com.example.employeemanagmentbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.employeemanagmentbackend.model.Employee;
import com.example.employeemanagmentbackend.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class EmployeeService implements EmployeeServiceInterface {

    @Autowired
    private EmployeeRepository employeeRepository;

    private static final String GMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@gmail\\.com$";
    private static final Pattern GMAIL_PATTERN = Pattern.compile(GMAIL_REGEX);
    private static final Pattern NAME_PATTERN = Pattern.compile("^[a-zA-Z]+$"); 

    @Override
    public Employee saveEmployee(Employee employee) {
        if (!GMAIL_PATTERN.matcher(employee.getEmail()).matches()) {
            throw new IllegalArgumentException("Email must be a valid @gmail.com address");
        }

        if (!NAME_PATTERN.matcher(employee.getFirstName()).matches() || !NAME_PATTERN.matcher(employee.getLastName()).matches()) {
            throw new IllegalArgumentException("First name and last name must contain only characters");
        }

        Optional<Employee> existingEmployee = employeeRepository.findByEmail(employee.getEmail());
        if (existingEmployee.isPresent()) {
            throw new IllegalArgumentException("Employee with email " + employee.getEmail() + " already exists");
        } else {
            return employeeRepository.save(employee);
        }
    }

    @Override
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(int id, Employee employee) {
        Employee employeeToUpdate = employeeRepository.findById(id).orElseThrow();

        if (!GMAIL_PATTERN.matcher(employee.getEmail()).matches()) {
            throw new IllegalArgumentException("Email must be a valid @gmail.com address");
        }

        if (!NAME_PATTERN.matcher(employee.getFirstName()).matches() || !NAME_PATTERN.matcher(employee.getLastName()).matches()) {
            throw new IllegalArgumentException("First name and last name must contain only characters");
        }

        employeeToUpdate.setFirstName(employee.getFirstName());
        employeeToUpdate.setLastName(employee.getLastName());
        employeeToUpdate.setEmail(employee.getEmail());
        return employeeRepository.save(employeeToUpdate);
    }

    @Override
    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }
}
