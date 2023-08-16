import { useEffect, useState } from "react"
import { get } from "../request"
import { GreenButton } from "./Button"
import { useNavigate } from "react-router-dom"


export function Managers(props) {
    const [managers, setManagers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        get("managers")
            .then(data => setManagers(data))
    }, [])

    const newManager = () => navigate('/managers/new')

    return (
        <div>
            { managers.length > 0 ? (
                managers.map((manager, index) => {
                    return (
                        <div key={index}>
                            <p>{manager.full_name}</p>
                        </div>
                    )
                })
            ) : (
                <p>You haven't added any managers yet!</p>
            )}
        <GreenButton label='Add Manager' onClick={newManager}/>
        </div>
    )

}