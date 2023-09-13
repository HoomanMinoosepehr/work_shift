import { useEffect, useState } from "react";
import { get, req } from "../request";
import { useNavigate } from "react-router-dom";
import { GreenButton, RedButton, YellowButton } from "./Button";
import employeePic from '../Pictures/employee.jpg'
import { Input } from "./Input";



export function Employees(props) {
    const [ employees, setEmployees ] = useState([])
    const [ employee, setEmployee ] = useState(null)
    const [ edit, setEdit ] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        get('employees')
            .then(data => {
                if(data.status === 403) {
                    props.setAlert({ color: 'red', message: data.message })
                    navigate('/')
                } else {
                    setEmployees(data)
                }
            })
    }, [])

    const employeeShow = id => {
        get(`employees/${id}`)
            .then(data => {
                setEmployee(data)
            })
    }

    const editEmployee = () => {
        setEdit({...employee})
        setEmployee(null)
    }

    const destroy = id => {
        req(`employees/${id}`, null, "DELETE")
            .then(data => {
                if(data.status === 200) {
                    props.setAlert({ color: 'yellow', message: data.message })
                    get('employees')
                        .then(data => {
                            setEmployees(data)
                            setEmployee(null)
                        })
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }

    const editChange = e => {
        const {name, value} = e.target
        setEdit({
            ...edit,
            [name]: value
        })
    }

    const submitEdit = () => {
        req( `employees/${edit.id}`, {employee: {...edit}}, "PATCH" )
            .then(data => {
                if(data.status === 200) {
                    props.setAlert({ color: 'green', message: data.message })
                    get('employees')
                        .then(data => setEmployees(data))
                    get(`employees/${edit.id}`)
                        .then(data => {
                            setEmployee(data)
                            setEdit(null)
                        })
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }

    const newEmployee = () => navigate("/employees/new")


    return (
        <div className="h-screen w-screen flex">
            <div className="w-full h-fit min-h-full flex justify-center bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${employeePic})`}}>
                <div className="w-full bg-gray-600 bg-opacity-50 flex justify-center">
                    <div className="sm:w-3/4 mt-32 mb-10 top-20 flex justify-center">
                        <div className="grow">
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
                                        onClick={() => employeeShow(employee.id)}
                                        >
                                            <p>{employee.full_name}</p>
                                        </button>
                                    </div>
                                    )
                                })
                            ) : (
                                <p className="text-white text-xl">There is no Employee yet.</p>
                            )}
                            <div className="mt-3">
                                <GreenButton label='Add Employee' onClick={newEmployee}/>
                            </div>
                        </div>
                        <div>
                        { employee != null ? (
                            <div className="text-white grow m-4 py-4 px-7 bg-slate-800 bg-opacity-70 rounded-2xl">
                                <h2 className="text-2xl">Employee: {employee.full_name}</h2>   
                                <p>First name: {employee.first_name}</p> 
                                <p>Last name: {employee.last_name}</p>
                                <p>Email: {employee.email}</p>
                                <p>Date of Join: {employee.editted_date}</p>
                                <div className="flex justify-between mt-4">
                                    <YellowButton label="Edit" onClick={editEmployee}/>
                                    <RedButton label="Delete" onClick={() => destroy(employee.id)}/>
                                </div>
                            </div>
                        ) : edit != null ? (
                            <div className="text-white grow m-4 py-4 px-7 bg-slate-800 bg-opacity-70 rounded-2xl">
                                <h1 className="text-2xl">Edit Manager:</h1>
                                <Input label='First name' id='first_name' value={edit.first_name} onChange={editChange} /> 
                                <Input label='Last name' id='last_name' value={edit.last_name} onChange={editChange} /> 
                                <Input label='Email' id='email' value={edit.email} onChange={editChange} /> 
                                <GreenButton label="Edit" onClick={submitEdit} />
                            </div>
                        ) : null }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}