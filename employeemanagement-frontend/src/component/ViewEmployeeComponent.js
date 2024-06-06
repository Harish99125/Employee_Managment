import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import './ViewEmployeeComponent.css'; 

const ViewEmployeeComponent = () => {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        EmployeeService.getEmployeeById(id)
            .then(res => {
                setEmployee(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    return (
        <div className="table-container">
            <table className="card">
                <thead>
                    <tr>
                        <th>Employee Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {employee ? (
                                <div>
                                    <p><strong>ID:</strong> {employee.id}</p>
                                    <p><strong>First Name:</strong> {employee.firstName}</p>
                                    <p><strong>Last Name:</strong> {employee.lastName}</p>
                                    <p><strong>Email:</strong> {employee.email}</p>
                                </div>
                            ) : (
                                <p className="loading-message">Loading employee data...</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ViewEmployeeComponent;
