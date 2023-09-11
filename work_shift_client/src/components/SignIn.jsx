import { useState } from "react";
import { Input } from "./Input";
import { GreenButton } from "./Button";
import { req } from "../request";
import { useNavigate } from "react-router-dom";
import fingerPrint from "../Pictures/fingerPrint.jpg"



export function SignIn(props) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const onChange = e  => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const onClick = () => {
        req('sessions', user)
            .then(data => {
                if (data.status === 200) {
                    props.setAlert({ color:'green', message: data.message })
                    props.current()
                    navigate('/')
                } else {
                    props.setAlert({ color:'red', message: data.message })
                }
            })
    }

    return (
        <div className="p-3 h-full w-full flex justify-center items-center bg-cover bg-center" style={{backgroundImage: `url(${fingerPrint})`}}>
            <div className="flex flex-col h-fit bg-amber-400 bg-opacity-40 rounded-xl px-3 py-9 w-1/4 items-center">
                <h1 className="text-4xl text-blue-900">Sign In:</h1>

                <Input 
                label='Email' 
                placeholder="Enter your email" 
                id='email' 
                onChange={onChange} 
                />

                <Input 
                label="Password" 
                type="password" 
                id="password" 
                onChange={onChange} 
                />

                <div className="mt-3">
                    <label htmlFor="">Role:</label><br />
                    <select className="p-2 border-yellow-600 rounded-md bg-blue-900 bg-opacity-70 text-white" name="type" id="type" onChange={onChange}>
                        <option value='' disabled selected>Select Your Role *</option>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="owner">Owner</option>
                    </select>
                </div>

                <div className="mt-3">

                    <GreenButton 
                    label='Sign In' 
                    onClick={onClick}
                    />
                    
                </div>
            </div>
        </div>
    )
}