import { useState } from "react";
import { Input } from "./Input";
import { GreenButton } from "./Button";
import { req } from "../request";
import { useNavigate } from "react-router-dom";



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
                    props.current()
                    navigate('/')
                } else {

                }
            })
    }

    return (
        <div className="p-3">

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
                <select className="p-2 border-yellow-600 rounded-md" name="type" id="type" onChange={onChange}>
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
    )
}