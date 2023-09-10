import { useEffect, useState } from "react"
import { get } from "../request"



export function Schedule(props) {
    const [shifts, setShifts] = useState([])


    useEffect(() => {
        get('schedule')
            .then(data => setShifts(data))
    }, [])

    return (
        <div>
            <p className="text-2xl">Up coming shifts:</p>
            {shifts.length > 0 ? (
                shifts.map((shift) => {
                    return (<div className="m-2 p-1 border rounded-md bg-slate-500 text-white">
                        <p>{shift.formatted_date} : </p>
                        <p>start: {shift.formatted_start} <br />End: {shift.formatted_end}</p>
                    </div>)
                })
            ) : (
                <p></p>
            )}
        </div>
    )
}