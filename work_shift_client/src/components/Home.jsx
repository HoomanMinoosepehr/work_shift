import 'react-calendar/dist/Calendar.css';
import homePic from '../Pictures/home.jpg'
import { useState } from 'react';
import { RedButton } from './Button';




export default function Home(props) {
    const [call, setCall] = useState(null)


    return (
        <div className="w-screen h-screen bg-cover bg-center flex justify-center" style={{backgroundImage: `url(${homePic})`}}>
            {call ? (
                <div className='absolute top-48 border bg-black text-white p-52 bg-opacity-80 rounded-3xl'>
                    <h1 className='text-5xl'>Call: (432) 231 7634</h1>
                    <div className='flex justify-center mt-5' onClick={() => setCall(null)}>
                        <RedButton label='Close'/>
                    </div>
                </div>
            ) : (
                null
            )}
            <div className='h-full w-full flex flex-col justify-center items-center  bg-white bg-opacity-60'>
                <div className='text-4xl text-blue-900'>
                    <p>A tool to manage your bussiness.</p>
                    <p><a className='underline cursor-pointer' onClick={() => setCall(true)}>Call us</a> now and start managing your company!</p>
                </div>
                <div className='mt-3 text-blue-900'>
                    <p className='text-xl'>You can use this application to assign shifts to your employees.</p>
                </div>
            </div>
        </div>
    )
}