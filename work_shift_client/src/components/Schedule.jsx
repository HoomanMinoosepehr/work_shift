import { useEffect, useState } from "react"
import { get } from "../request"
import schedulePic from '../Pictures/schedule.jpg'



export function Schedule(props) {
    const [shifts, setShifts] = useState([])


    useEffect(() => {
        get('schedule')
            .then(data => setShifts(data))
    }, [])

    return (
        <div className="w-screen h-screen flex">
            <div className="w-full h-fit min-h-full bg-fixed bg-cover bg-center flex justify-center" style={{backgroundImage: `url(${schedulePic})`}}>
                <div className="w-1/2 h-fit mt-32 mb-10 bg-gray-600 rounded-xl bg-opacity-70 p-8">
                    <p className="text-2xl">Up coming shifts:</p>
                    {shifts.length > 0 ? (
                        shifts.map((shift) => {
                            return (<div className="m-2 p-3 rounded-md bg-slate-300 text-blue-900 bg-opacity-70">
                                <p>{shift.formatted_date} : </p>
                                <p>start: {shift.formatted_start} <br />End: {shift.formatted_end}</p>
                            </div>)
                        })
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    )
}