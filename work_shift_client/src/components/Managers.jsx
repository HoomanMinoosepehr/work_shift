import { useEffect, useState } from "react"
import { get, req } from "../request"
import { GreenButton, RedButton, YellowButton } from "./Button"
import { useNavigate } from "react-router-dom"
import managerPic from "../Pictures/managers.jpg"
import { Input } from "./Input"


export function Managers(props) {
    const [managers, setManagers] = useState([])
    const [manager, setManager] = useState(null)
    const [edit, setEdit] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        get("managers")
            .then(data => setManagers(data))
    }, [])

    const directShow = (id) => {
        get(`managers/${id}`)
            .then(data => {
                setManager(data)
            })
    }

    const editManager = () => {
        setEdit({...manager})
        setManager(null)
    }

    const editChange = e => {
        const {name, value} = e.target;
        setEdit({
            ...edit,
            [name]: value
        })
    }

    const submitEdit = () => {
        req(`managers/${edit.id}`, {manager: {...edit}}, "PATCH")
            .then(data => {
                if(data.status === 200) {
                    get("managers")
                        .then(data => setManagers(data))

                        get(`managers/${edit.id}`)
                            .then(data => {
                                setManager(data)
                            })

                    setEdit(null)

                    props.setAlert({ color: 'green', message: "Manager Updated Successfully!" })
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }

    const destroy = (id) => {
        req(`managers/${id}`, null, "DELETE")
            .then(data => {
                if(data.status != 422) {
                    props.setAlert({ color: 'yellow', message: data.message })
                    setManager(null)
                    get('managers').then(data => setManagers(data))
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }

    const newManager = () => navigate('/managers/new')

    return (
        <div className="w-full h-full flex justify-center bg-cover bg-center" style={{backgroundImage: `url(${managerPic})`}}>
            <div className="w-full h-full bg-gray-600 bg-opacity-50 flex justify-center">
                <div className="sm:w-3/4 absolute top-20 flex">
                    <div className="grow">
                        <h1 className="text-3xl text-white">
                            List of Company's Managers:
                        </h1>
                        { managers.length > 0 ? (
                            managers.map((manager, index) => {
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
                                        onClick={() => directShow(manager.id)}
                                        >
                                            <p>{manager.full_name}</p>
                                        </button>
                                    </div>
                                )
                            })
                        ) : (
                            <p>You haven't added any managers yet!</p>
                        )}
                        <div className="m-1">
                            <GreenButton label='Add Manager' onClick={newManager}/>
                        </div>
                    </div>
                    <div>
                    { manager != null ? (
                        <div className="text-white m-4 py-4 px-7 bg-slate-800 bg-opacity-70 rounded-2xl">
                            <h2 className="text-2xl">Manager: {manager.full_name}</h2>   
                            <p>First name: {manager.first_name}</p> 
                            <p>Last name: {manager.last_name}</p>
                            <p>Email: {manager.email}</p>
                            <p>Date of Join: {manager.join_date}</p>
                            <div className="flex justify-between mt-4">
                                <YellowButton label="Edit" onClick={editManager}/>
                                <RedButton label="Delete" onClick={() => destroy(manager.id)}/>
                            </div>
                        </div>
                    ) : edit != null ? (
                        <div className="text-white m-4 py-4 px-7 bg-slate-800 bg-opacity-70 rounded-2xl">
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
    )

}