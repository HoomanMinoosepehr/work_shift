import { useEffect, useState } from "react";
import { get } from "../request";
import { useNavigate } from "react-router-dom";
import { GreenButton } from "./Button";



export function Employees(props) {
    const [ employees, setEmployees ] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        get('employees')
            .then(data => setEmployees(data))
    }, [])

    const newEmployee = () => navigate("/employees/new")


    return (
        <div>
            <div>
                { employees.length > 0 ? (
                    employees.map((employee, index) => {
                        return (
                            <div key={index}>
                                <p>{employee.full_name}</p>
                            </div>
                        )
                    })
                ) : (
                    <p>There is no Employee yet.</p>
                )}
                <GreenButton label='Add Employee' onClick={newEmployee}/>
            </div>
        </div>
    )
}