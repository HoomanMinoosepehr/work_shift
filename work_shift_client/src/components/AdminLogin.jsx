import { useState } from "react";
import { Input } from "./Input";
import { GreenButton, RedButton } from "./Button";
import { req } from "../request";



export function AdminLogin(props) {
    const [admin, setAdmin] = useState(true)
    const [company, setCompany] = useState(null)


    const adminChange = e  => {
        const { name, value } = e.target;
        setAdmin({
            ...admin,
            [name]: value
        })
    }

    const onClick = () => {
        req('admins', admin)
            .then(data => {
                if(data.status === 200) {
                    props.setAlert({ color: 'green', message: data.message })
                    setCompany({user_name: admin.user_name})
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }

    const companyChange = e => {
        const { name, value } = e.target;
        setCompany({
            ...company,
            [name]: value
        })
    }

    const onSubmit = () => {
        req('companies',{company})
            .then(data => {
                if(data.status === 200) {
                    props.setAlert({ color: 'green', message: data.message })
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }


    return(
        <div className="p-3 h-full w-full flex justify-center items-center bg-cover bg-center">
            {company === null ? (
                <div className="flex flex-col h-fit bg-red-500 rounded-xl px-3 py-9 w-1/4 items-center min-w-fit">
                    <h1 className="text-4xl text-white">Admin Login:</h1>

                    <Input 
                    label='User name'
                    id='user_name' 
                    onChange={adminChange} 
                    />

                    <Input 
                    label="Password" 
                    type="password" 
                    id="password" 
                    onChange={adminChange} 
                    />

                    <div className="mt-3">

                        <GreenButton 
                        label='Sign In' 
                        onClick={onClick}
                        />
                        
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex bg-center bg-cover bg-fixed justify-center items-center">
                    <div className="w-1/4 rounded-xl py-9 absolute top-32 px-16 flex justify-center items-center flex-col bg-gray-400 bg-opacity-70 min-w-fit">
                        <h1 className="text-3xl">Add a New Company:</h1>
                        <Input 
                        label='Name'
                        id="first_name"
                        placeholder="First Name"
                        onChange={companyChange}
                        />

                        <Input 
                        label='Last name' 
                        id="last_name" 
                        placeholder="Last Name" 
                        onChange={companyChange}
                        />

                        <Input 
                        label='Company name' 
                        id="company_name" 
                        placeholder="Company name" 
                        onChange={companyChange}
                        />

                        <Input 
                        label='Email' 
                        id="email" 
                        placeholder="Email address" 
                        onChange={companyChange} 
                        />

                        <Input 
                        label='Password' 
                        type='password' 
                        id="password" 
                        onChange={companyChange}
                        />

                        <Input 
                        label='Re-Enter Password' 
                        type="password" 
                        id="password_confirmation" 
                        onChange={companyChange} 
                        />

                        <Input 
                        label='Admin Password' 
                        type="password" 
                        id="admin_password" 
                        onChange={companyChange} 
                        />
                        <div className="flex flex-col">
                            <div className="mb-3">
                                <GreenButton 
                                label='Create Company' 
                                onClick={onSubmit} 
                                />
                            </div>
                            <div>
                                <RedButton
                                label='Log out!'
                                onClick={() => setCompany(null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}