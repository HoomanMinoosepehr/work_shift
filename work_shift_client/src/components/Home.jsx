import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';



export default function Home(props) {
    const [date, setDate] = useState(null)

    const click = (value, event) => {
        setDate(value)
    }

    const submit = () => {
        fetch()
    }


    return (
        <div>
            <Calendar onClickDay={click}/>
            { date ? (
                <div>
                    <p className="">{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</p>
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