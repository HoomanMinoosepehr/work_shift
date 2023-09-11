import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { get, req } from "../request";
import { GreenButton, RedButton } from "./Button";



export function SetShifts(props) {
    const [date, setDate] = useState(null)
    const [employees, setEmployees] = useState([])
    const [shift, setShift] = useState(null)
    const [assigned, setAssigned] = useState([])
    const [names, setNames] = useState([])

    useEffect(() => {
        get(`employees`)
            .then(data => {
                setEmployees(data)
            })
    }, [])

    const select = (value) => {
        setShift({ date: value, start_time: '08:00', end_time: '17:00' })
        setDate({ date: value })
        assigning(value)
        
    }

    const assigning = date => {
        req(`assign`, {date: date})
            .then(data => {
                setAssigned(data)
            })
    }

    const onChange = e => {
        const {name, value} = e.target;
        setShift({
            ...shift,
            [name]: value
        })
    }

    const assign = () => {
        req(`shifts`, {shift})
            .then(data => {
                if(data.status === 200){
                    props.setAlert({color: 'green', message: 'Shift is assigned successfully.'})
                    assigning(date.date)
                } else {
                    props.setAlert({color: 'red', message: "Shift has been alread assigned to this employee!"})
                }
            })
            
    }

    const deleteShift = (id) => {
        req(`shifts/${id}`, {}, "DELETE")
            .then(data => {
                if(data.status === 200) {
                    props.setAlert({ color: "yellow", message: "Shift deleted successfully." })
                    assigning(date.date)
                } else {
                    props.setAlert({ color: 'red', message: data.message })
                }
            })
    }

    return (
        <div>
            <Calendar onClickDay={select}/>
            { date ? (
                <div className="border rounded-xl p-3 m-3 flex">
                    <div className="grow border rounded-md m-1 p-2">
                        <p className="text-xl">Date: {date.date.getDate()}/{date.date.getMonth()+1}/{date.date.getFullYear()}</p>
                        <div className="mt-2">
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
                            <div className="mt-1">
                                <label
                                htmlFor="">
                                    Starting hour:
                                </label>
                                <input
                                className="border
                                p-1 mx-1
                                rounded-lg"
                                type="time"
                                name="start_time"
                                defaultValue='08:00'
                                onChange={onChange}/>
                            </div>
                            <div className="mt-1">
                                <label
                                htmlFor="">
                                    Ending hour:
                                </label>
                                <input
                                className="border rounded-lg p-1 mx-1"
                                type="time"
                                name="end_time"
                                defaultValue='17:00'
                                onChange={onChange}/>
                            </div>
                            <GreenButton label="Assign" onClick={assign}/>
                        </div>
                    </div>
                    <div className="border grow rounded-md m-1 p-2">
                        <p className="text-xl">Assigned Shifts:</p>
                        { assigned.length == 0 ? (
                            <p className="text-xl text-red-500 m-2">No Shift been assigned for this date!</p>
                        ) : (
                            assigned.map(shift => {
                                return (
                                    <div className="border
                                    rounded-md
                                    bg-green-800
                                    text-white
                                    mt-2
                                    px-2
                                    py-1
                                    flex
                                    content-center
                                    justify-between">
                                        <div>
                                            <p><span className="text-yellow-400">{shift.employee.full_name}</span> : <span className="text-blue-300">{shift.formatted_start}</span> to <span className="text-red-400">{shift.formatted_end}</span> assigned by {shift.assigner}</p>
                                        </div>
                                        <div>
                                            <RedButton onClick={() => deleteShift(shift.id)} label='Delete' color="red" />
                                        </div>
                                    </div>
                                )
                            })
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