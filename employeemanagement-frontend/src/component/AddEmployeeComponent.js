import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { toast } from 'react-toastify';
import './AddEmployeeComponent.css';


const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id).then((res) => {
                let employee = res.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmail(employee.email);
            }).catch(err => console.log(err));
        }
    }, [id]);

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        
        if (!nameRegex.test(firstName)) {
            toast.error('First name must contain only characters');
            return false;
        }
        if (!nameRegex.test(lastName)) {
            toast.error('Last name must contain only characters');
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error('Email must be a valid @gmail.com address');
            return false;
        }
        return true;
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        let employee = { firstName, lastName, email };
        
        if (id) {
            EmployeeService.updateEmployee(id, employee).then((res) => {
                toast.success('Employee updated successfully');
                navigate('/employee');
            }).catch(err => {
                toast.error(err.response.data);
                console.log(err);
            });
        } else {
            EmployeeService.saveEmployee(employee).then((res) => {
                toast.success('Employee added successfully');
                navigate('/employee');
            }).catch(err => {
                if (err.response && err.response.status === 400) {
                    toast.error('Employee already exists');
                } else {
                    toast.error('An error occurred');
                }
                console.log(err);
            });
        }
    };

    const handleCancel = () => {
        navigate('/employee');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">{id ? 'Update Employee' : 'Add Employee'}</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>First Name:</label>
                                <input type="text" placeholder="First Name" name="firstName" className="form-control"
                                    value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input type="text" placeholder="Last Name" name="lastName" className="form-control"
                                    value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" placeholder="Email Address" name="email" className="form-control"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <button className="btn btn-primary mr-2" onClick={saveOrUpdateEmployee}>Save</button>
                            <span className="mr-2">    </span>
                            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;
