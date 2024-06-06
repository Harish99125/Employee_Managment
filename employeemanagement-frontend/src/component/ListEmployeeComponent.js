import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        EmployeeService.getAllEmployee()
            .then(response => setEmployees(response.data))
            .catch(error => console.log(error));
    };

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then(() => getAllEmployees())
            .catch(error => console.log(error));
    };

    return (
        <div className="container mt-4">
            <Link to="/add-employee" className="btn btn-primary mb-3">Add Employee</Link>
            <h2 className="text-center mb-4">Employee List</h2>
            <table className="table table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link to={`/add-employee/${employee.id}`} className="btn btn-warning btn-sm me-2">Update</Link>
                                <button className="btn btn-danger btn-sm me-2" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                <Link to={`/view-employee/${employee.id}`} className="btn btn-success btn-sm">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
