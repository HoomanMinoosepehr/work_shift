import { useState } from "react";
import { GreenButton } from "./Button";
import { Input } from "./Input";
import { req } from "../request";
import { useNavigate } from "react-router-dom";
import addManager from '../Pictures/addManager.jpg'



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
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }


    return (
        <div className="w-full h-full flex bg-center bg-cover justify-center items-center" style={{backgroundImage: `url(${addManager})`}}>
            <div className="w-1/4 rounded-xl py-9 px-16 absolute top-32 flex justify-center items-center flex-col bg-amber-100 bg-opacity-70 min-w-fit">
                <h1 className="text-3xl">Add a New Manager:</h1>
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