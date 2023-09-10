import { useEffect, useState } from "react";
import { get } from "../request";
import { useNavigate } from "react-router-dom";
import { GreenButton } from "./Button";
import employee_pic from '../Pictures/employee.jpg'



export function Employees(props) {
    const [ employees, setEmployees ] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        get('employees')
            .then(data => setEmployees(data))
    }, [])

    const newEmployee = () => navigate("/employees/new")


    return (
        <div className="w-full h-full flex justify-center bg-cover bg-center" style={{backgroundImage: `url(${employee_pic})`}}>
            <div className="w-full h-full bg-gray-600 bg-opacity-50 flex justify-center">
                <div className="sm:w-1/2 absolute top-20">
                    <h1 className="text-3xl text-blue-900">List of Company's Employees:</h1>
                { employees.length > 0 ? (
                    employees.map((employee, index) => {
                        return (
                            <div key={index}>
                            <button className="border
                            bg-opacity-60
                            w-full
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
    </div>
    )
}