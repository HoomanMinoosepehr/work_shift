import { useState } from "react";
import { Input } from "./Input";
import { GreenButton } from "./Button";
import { req } from "../request";
import { useNavigate } from "react-router-dom";



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
                }
            })
    }

    return (
        <div>
            Add New Employee:
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
    )
}