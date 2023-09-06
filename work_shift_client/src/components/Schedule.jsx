import { useEffect } from "react"
import { get } from "../request"



export function Schedule(props) {


    useEffect(() => {
        get('schedule')
            .then(data => console.log(data))
    }, [])

    return (
        <div>
            Hello
        </div>
    )
}