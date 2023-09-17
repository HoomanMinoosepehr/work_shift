import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { get, req } from "../request";
import { GreenButton, RedButton } from "./Button";
import timing from '../Pictures/timing.jpg'
import { useNavigate } from "react-router-dom";



export function SetShifts(props) {
    const [date, setDate] = useState(null)
    const [employees, setEmployees] = useState([])
    const [shift, setShift] = useState(null)
    const [assigned, setAssigned] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        get(`employees`)
            .then(data => {
                if(data.status === 403) {
                    props.setAlert({ color: 'red', message: data.message })
                    navigate('/')
                } else {
                    setEmployees(data)
                }
            })
    }, [])

    const select = (value) => {
        setShift({ date: value, employee_id: '-1', start_time: '08:00', end_time: '17:00' })
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
        <div className="h-screen w-screen flex">
            <div className="w-full h-fit min-h-full bg-fixed bg-cover bg-center flex justify-center" style={{backgroundImage: `url(${timing})`}}>
                <div className="mt-32 mb-10 w-3/4 flex flex-col items-center bg-blue-100 bg-opacity-70 rounded-xl p-3">
                    <div className="w-full p-2 mb-3">
                        <h1 className="text-3xl text-blue-900">Assign employee's shifts:</h1>
                    </div>
                    <Calendar onClickDay={select}/>
                    { date ? (
                        <div className="border border-blue-900 rounded-xl p-3 m-3 flex w-full">
                            <div className="grow border border-blue-900 rounded-md m-1 p-2 h-fit">
                                <p className="text-xl text-blue-900">Date: {date.date.getDate()}/{date.date.getMonth()+1}/{date.date.getFullYear()}</p>
                                <div className="mt-2">
                                    <div>
                                        <label
                                        htmlFor="name">
                                            Employees:
                                        </label>
                                        <select className="p-1 rounded-md mx-1 bg-blue-900 bg-opacity-60 text-white" name="employee_id" value={shift.employee_id} onChange={onChange}>
                                            <option value='-1'>Select Employee</option>
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
                                        rounded-lg
                                        bg-blue-900
                                        bg-opacity-60
                                        text-white"
                                        type="time"
                                        name="start_time"
                                        // defaultValue='08:00'
                                        value={shift.start_time}
                                        onChange={onChange}/>
                                    </div>
                                    <div className="mt-1">
                                        <label
                                        htmlFor="">
                                            Ending hour:
                                        </label>
                                        <input
                                        className="border bg-blue-900 bg-opacity-60 text-white rounded-lg p-1 mx-1"
                                        type="time"
                                        name="end_time"
                                        // defaultValue='17:00'
                                        value={shift.end_time}
                                        onChange={onChange}/>
                                    </div>
                                    <GreenButton label="Assign" onClick={assign}/>
                                </div>
                            </div>
                            <div className="border border-blue-900 grow rounded-md m-1 p-2">
                                <p className="text-xl text-blue-900">Assigned Shifts:</p>
                                { assigned.length === 0 ? (
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
                    <div className="m-5">
                        <p className="text-red-700 text-3xl">"Select a Date"</p>
                    </div>
                    }   
                </div>
            </div>
        </div>
    )
}