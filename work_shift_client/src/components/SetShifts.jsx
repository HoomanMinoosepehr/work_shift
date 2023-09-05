import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { get, req } from "../request";
import { GreenButton } from "./Button";



export function SetShifts(props) {
    const [date, setDate] = useState(null)
    const [employees, setEmployees] = useState([])
    const [shift, setShift] = useState(null)
    const [assigned, setAssigned] = useState([])

    useEffect(() => {
        get(`employees`)
            .then(data => {
                setEmployees(data)
            })
    }, [])

    const select = (value) => {
        setDate({ date: value })
        setShift({ date: value })
        req(`assign`, {date: value})
            .then(data => {
                setAssigned(data)
                console.log(data)
            })
    }

    const onChange = e => {
        const {name, value} = e.target;
        setShift({
            ...shift,
            [name]: value
        })
        console.log(shift)
    }

    const assign = () => {
        req(`shifts`, {shift})
            
    }

    return (
        <div>
            <Calendar onClickDay={select}/>
            { date ? (
                <div className="border rounded-xl p-3 m-3 flex">
                    <div className="grow border rounded-md m-1 p-2">
                        <p className="">Date: {date.date.getDate()}/{date.date.getMonth()+1}/{date.date.getFullYear()}</p>
                        <div className="">
                            <div>
                                <label
                                htmlFor="name">
                                    Employees:
                                </label>
                                <select name="employee_id" onChange={onChange}>
                                    <option selected>Select Employee</option>
                                    {
                                        employees.map((employee, index) => (
                                                <option
                                                key={index}
                                                value={employee.id}>
                                                    {employee.full_name}
                                                </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label
                                htmlFor="">
                                    Starting hour:
                                </label>
                                <input
                                className="border
                                rounded-lg"
                                type="time"
                                name="start_time"
                                defaultValue='08:00'
                                onChange={onChange}/>
                            </div>
                            <div>
                                <label
                                htmlFor="">
                                    Ending hour:
                                </label>
                                <input
                                className="border rounded-lg"
                                type="time"
                                name="end_time"
                                defaultValue='17:00'
                                onChange={onChange}/>
                            </div>
                            <GreenButton label="Assign" onClick={assign}/>
                        </div>
                    </div>
                    <div className="border grow rounded-md m-1 p-2">
                        <p>Assigned Shifts:</p>
                        { assigned.length == 0 ? (
                            <p className="text-xl text-red-500 m-2">No Shift been assigned for this date!</p>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            )
            :
            <>
                <p>Select a Date.</p>
            </>
            }   
        </div>
    )
}