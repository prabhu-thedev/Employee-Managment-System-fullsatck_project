package com.naniSol.employee.service;

import com.naniSol.employee.entity.Employee;
import com.naniSol.employee.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;


    public Employee postEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){
        if (!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee ID" + id + " not found");
        }
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id){
        return employeeRepository.findById(id).orElse(null);
    }


    public Employee updateEmployee(Long id, Employee employee){
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()){
            Employee updatedEmployee = employeeOptional.get();
            updatedEmployee.setName(employee.getName());
            updatedEmployee.setEmail(employee.getEmail());
            updatedEmployee.setPhone_no(employee.getPhone_no());
            updatedEmployee.setDept(employee.getDept());

            return employeeRepository.save(updatedEmployee);
        }
        return null;
    }
}
