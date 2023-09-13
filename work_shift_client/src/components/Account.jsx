import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { get, req } from "../request"
import { GreenButton, RedButton, YellowButton } from "./Button"
import { Input } from "./Input"
import accountPic from '../Pictures/account.jpg'


export function Account(props) {
    const [account, setAccount] = useState(null)
    const [edit, setEdit] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        switch(props.user.type){
            case 'Owner':
                get(`companies/${props.user.id}`)
                    .then(data => {
                        if(data.status === 422){
                            props.setAlert({ color: 'red', message: data.message})
                        } else {
                            setAccount(data)
                        }
                    })
                break;
            case 'Manager':
                get(`managers/${props.user.id}`)
                    .then(data => {
                        if(data.status === 422){
                            props.setAlert({ color: 'red', message: data.message})
                        } else {
                            setAccount(data)
                        }
                    })
                break;
            case 'Employee':
                get(`employees/${props.user.id}`)
                    .then(data => {
                        if(data.status === 422){
                            props.setAlert({ color: 'red', message: data.message})
                        } else {
                            setAccount(data)
                        }
                    })
                break;
        }
    }, [])

    const editAccount = () => {
        setEdit({...account})
        setPassword(null)
    }

    const editChange = e => {
        const {name, value} = e.target
        setEdit({
            ...edit,
            [name]: value
        })
    }

    const editPassword = () => {
        setEdit(null)
        setPassword(true)
    }

    const passChange = e => {
        const {name, value} = e.target
        setPassword({
            ...password,
            [name]: value
        })
    }

    const submitaccount = () => {
        switch(props.user.type){
            case 'Owner':
                req(`companies/${props.user.id}`, {company: {...edit}}, "PATCH")
                    .then(data => {
                        if(data.status === 200) {
                            props.setAlert({ color: 'green', message: "Account updated successfully" })
                            setEdit(null)
                            get(`companies/${props.user.id}`)
                                .then(data => {
                                    if(data.status === 422){
                                        props.setAlert({ color: 'red', message: data.message})
                                    } else {
                                        setAccount(data)
                                    }
                                })
                        }
                    })
                break;
            case 'Manager':
                req(`managers/${props.user.id}`, {manager: {...edit}}, "PATCH")
                    .then(data => {
                        if(data.status === 200) {
                            props.setAlert({ color: 'green', message: "Account updated successfully" })
                            setEdit(null)
                            get(`managers/${props.user.id}`)
                                .then(data => {
                                    if(data.status === 422){
                                        props.setAlert({ color: 'red', message: data.message})
                                    } else {
                                        setAccount(data)
                                    }
                                })
                        }
                    })
                break;
            case 'Employee':
                req(`employees/${props.user.id}`, {employee: {...edit}}, "PATCH")
                    .then(data => {
                        if(data.status === 200) {
                            props.setAlert({ color: 'green', message: "Account updated successfully" })
                            setEdit(null)
                            get(`employees/${props.user.id}`)
                                .then(data => {
                                    if(data.status === 422){
                                        props.setAlert({ color: 'red', message: data.message})
                                    } else {
                                        setAccount(data)
                                    }
                                })
                        }
                    })
                
                break;
        }
    }

    const submitPass = () => {
        switch(props.user.type){
            case 'Owner':
                req(`companies/${props.user.id}/password`, {company: {...password}})
                    .then(data => {
                        if(data.status === 200) {
                            props.setAlert({ color: 'green', message: "Password updated successfully" })
                            navigate('/sign-in')
                            props.setUser([])
                        } else {
                            props.setAlert({color: 'red', message: data.message})
                        }
                    })
                break;
            case 'Manager':
                req(`managers/${props.user.id}/password`, {manager: {...password}})
                    .then(data => {
                        if(data.status === 200) {
                            props.setAlert({ color: 'green', message: "Password updated successfully" })
                            navigate('/sign-in')
                            props.setUser([])
                        } else {
                            props.setAlert({color: 'red', message: data.message})
                        }
                    })
                break;
            case 'Employee':
                req(`employees/${props.user.id}/password`, {employee: {...password}})
                    .then(data => {
                        if(data.status === 200) {
                            props.setAlert({ color: 'green', message: "Password updated successfully" })
                            navigate('/sign-in')
                            props.setUser([])
                        } else {
                            props.setAlert({color: 'red', message: data.message})
                        }
                    })
                
                break;
        }
    }

    return (
        <div className="h-screen w-screen flex">
            <div className="w-full h-fit min-h-full flex justify-center bg-cover bg-fixed bg-center" style={{backgroundImage: `url(${accountPic})`}}>
                <div className="w-full bg-gray-600 bg-opacity-50 flex justify-center">
                    <div className="flex mt-32">
                        {account ? (
                            <div className="text-white m-4 h-fit py-4 px-7 bg-slate-800 bg-opacity-70 rounded-2xl">
                                <h2 className="text-2xl">Manager: {account.full_name}</h2>   
                                <p>First name: {account.first_name}</p> 
                                <p>Last name: {account.last_name}</p>
                                <p>Email: {account.email}</p>
                                <p>Date of Join: {account.join_date}</p>
                                <div className="flex justify-between mt-4">
                                    <YellowButton label="Edit" onClick={editAccount}/>
                                    <YellowButton label="Change Password" onClick={editPassword}/>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                        {edit !== null ? (
                             <div className="text-white h-fit m-4 py-4 px-7 bg-slate-800 bg-opacity-70 rounded-2xl">
                                    <h1 className="text-2xl">Edit Manager:</h1>
                                    <Input label='First name' id='first_name' value={edit.first_name} onChange={editChange} /> 
                                    <Input label='Last name' id='last_name' value={edit.last_name} onChange={editChange} /> 
                                    <Input label='Email' id='email' value={edit.email} onChange={editChange} /> 
                                    <GreenButton label="Edit" onClick={submitaccount} />
                            </div>
                        ) : password !== null ? (
                            <div className="text-white h-fit m-4 py-4 px-7 bg-slate-800 bg-opacity-70 rounded-2xl">
                                    <h1 className="text-2xl">Edit Password:</h1>
                                    <Input label='Old password' id='old_password' type='password' onChange={passChange} /> 
                                    <Input label='New password' id='password' type="password" onChange={passChange} /> 
                                    <Input label='Re-enter new password' id='password_confirmaton' type="password" onChange={passChange} /> 
                                    <GreenButton label="Edit" onClick={submitPass} />
                            </div>
                        ) : (null)}
                    </div>
                </div>
            </div>
        </div>
    )
}