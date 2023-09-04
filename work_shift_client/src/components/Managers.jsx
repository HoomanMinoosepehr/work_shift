import { useEffect, useState } from "react"
import { get, req } from "../request"
import { GreenButton, RedButton, YellowButton } from "./Button"
import { useNavigate } from "react-router-dom"


export function Managers(props) {
    const [managers, setManagers] = useState([])
    const [manager, setManager] = useState(null)
    const [fullName, setFullName] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        get("managers")
            .then(data => setManagers(data))
    }, [])

    const directShow = (id) => {
        get(`managers/${id}`)
            .then(data => {
                setManager(data.manager)
                setFullName(data.full_name)
            })
    }

    const destroy = (id) => {
        req(`managers/${id}`, null, "DELETE")
            .then(data => {
                if(data.status === 200) {
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
        <div>
            { managers.length > 0 ? (
                managers.map((manager, index) => {
                    return (
                        <div key={index}>
                            <button className="border
                            w-1/2
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
            <GreenButton label='Add Manager' onClick={newManager}/>
            { manager != null ? (
                <div>
                    <h2>Manager: {fullName}</h2>   
                    <p>First name: {manager.first_name}</p> 
                    <p>Last name: {manager.last_name}</p>
                    <p>Email: {manager.email}</p>
                    <div className="flex justify-between">
                        <YellowButton label="Edit"/>
                        <RedButton label="Delete" onClick={() => destroy(manager.id)}/>
                    </div>
                </div>
            ) : null}
        </div>
    )

}