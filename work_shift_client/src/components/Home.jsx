import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { get, req } from '../request'




export default function Home(props) {
    const [shift, setShift] = useState(null)

    const select = (value) => {
        setShift({ date: value })
    }

    const submit = () => {
        req('shifts', {shift})
            .then(data => data.message)
    }


    return (
        <div className="m-2">
            <Calendar onClickDay={select}/>
            { shift ? (
                <div>
                    <p className="">{shift.date.getDate()}/{shift.date.getMonth()+1}/{shift.date.getFullYear()}</p>
                    <button className="border text-white rounded-md bg-slate-500 px-3 py-1" onClick={submit}>Submit</button>
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