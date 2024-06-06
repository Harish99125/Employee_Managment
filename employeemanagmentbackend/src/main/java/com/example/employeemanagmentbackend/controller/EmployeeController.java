package com.example.employeemanagmentbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.employeemanagmentbackend.model.Employee;
import com.example.employeemanagmentbackend.service.EmployeeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService; 

    @PostMapping
    public ResponseEntity<?> saveEmployee(@RequestBody Employee employee){
        try {
            Employee savedEmployee = employeeService.saveEmployee(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

        
    @GetMapping
    public List<Employee> getAllEmployee(){
        return employeeService.getAllEmployee();
    }
     
    @GetMapping("/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable int id){
        return employeeService.getEmployeeById(id);
    }
       
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable int id, @RequestBody Employee employee){
        return employeeService.updateEmployee(id,employee);
    }
     
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable int id){
        employeeService.deleteEmployee(id);
    }
}
