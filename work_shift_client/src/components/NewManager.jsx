import { useState } from "react";
import { GreenButton } from "./Button";
import { Input } from "./Input";
import { req } from "../request";
import { useNavigate } from "react-router-dom";



export function NewManager(props) {
    const [manager, setManager] = useState(null)
    const navigate = useNavigate()

    const onChange = e => {
        const { name, value } = e.target
        setManager({
            ...manager,
            [name]: value
        })
    }

    const onSubmit = () => {
        req("managers", {manager})
            .then(data => {
                if (data.status === 200) {
                    navigate('/managers')
                }
            })
    }


    return (
        <div>
            Add a New Manager:
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