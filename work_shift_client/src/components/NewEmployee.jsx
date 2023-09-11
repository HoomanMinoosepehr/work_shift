import { useState } from "react";
import { Input } from "./Input";
import { GreenButton } from "./Button";
import { req } from "../request";
import { useNavigate } from "react-router-dom";
import addEmployee from '../Pictures/addEmployee.jpg'



export function NewEmployee(props) {
    const [ employee, setEmployee ] = useState(null)
    const navigate = useNavigate()

    const onChange = e => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        })
    }

    const onSubmit = () => {
        req("employees", {employee})
            .then(data => {
                if (data.status === 200) {
                    navigate('/employees')
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }

    return (
        <div className="w-full h-full flex bg-center bg-cover bg-fixed justify-center items-center" style={{backgroundImage: `url(${addEmployee})`}}>
            <div className="w-1/4 rounded-xl py-9 absolute top-32 px-16 flex justify-center items-center flex-col bg-gray-400 bg-opacity-70 min-w-fit">
                <h1 className="text-3xl">Add a New Employee:</h1>
                <Input 
                label='Name'
                id="first_name"
                placeholder="First Name"
                onChange={onChange}
                />

                <Input 
                label='Family' 
                id="last_name" 
                placeholder="Last Name" 
                onChange={onChange}
                />

                <Input 
                label='Email' 
                id="email" 
                placeholder="Email address" 
                onChange={onChange} 
                />

                <Input 
                label='Password' 
                type='password' 
                id="password" 
                onChange={onChange}
                />

                <Input 
                label='Re-Enter Password' 
                type="password" 
                id="password_confirmation" 
                onChange={onChange} 
                />

                <GreenButton 
                label='Add Employee' 
                onClick={onSubmit} 
                />
            </div>
        </div>
    )
}