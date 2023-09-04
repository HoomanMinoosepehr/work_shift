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
                            <button className="border
                            w-1/2
                            rounded-md
                            mt-4
                            flex
                            py-1
                            bg-gray-300
                            hover:bg-gray-700
                            hover:text-white
                            px-2
                            duration-200"
                            >
                                <p>{employee.full_name}</p>
                            </button>
                        </div>
                        )
                    })
                ) : (
                    <p>There is no Employee yet.</p>
                )}
                <div className="mt-3">
                    <GreenButton label='Add Employee' onClick={newEmployee}/>
                </div>
            </div>
        </div>
    )
}