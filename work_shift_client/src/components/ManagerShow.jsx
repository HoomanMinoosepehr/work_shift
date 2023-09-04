import { useEffect, useState } from "react"
import { get } from "../request"
import { useParams } from "react-router-dom"


export function ManagerShow(props) {
    const [manager, setManager] = useState(null)
    const id = useParams()

    useEffect(() => {
        get(``)
    }, [])

    return (
        <div>

        </div>
    )
}