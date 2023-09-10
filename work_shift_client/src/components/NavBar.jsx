import { NavLink } from "react-router-dom";
import { get } from "../request";
import { RedButton } from "./Button";


export function NavBar(props) {
    
    const onClick = () => {
        get('sessions')
         .then(data => console.log(data))
    }

    return (
        <div className="flex flex-row justify-around content-center absolute w-full h-16 p-3 bg-blue-900 bg-opacity-70">
            <div className="grow flex justify-center items-center text-gray-100">
                <NavLink to={'/'}>Home</NavLink>
            </div>
            
            {
                props.user ? (
                    <div className="flex flex-row justify-around items-center grow text-gray-100">
                            { props.user.type === 'Owner' ? (
                                <div className="flex justify-around content-center grow">
                                    <NavLink to={'/managers'}>Managers</NavLink>
                                    <NavLink to={'/employees'}>Employees</NavLink>
                                    <NavLink to={'/shifts'}>Shifts</NavLink>
                                </div>
                            ) : props.user.type === 'Manager' ? (
                                <div className=" grow flex justify-around content-center">
                                    <NavLink to={'/employees'}>Employees</NavLink>
                                    <NavLink to={'/shifts'}>Shifts</NavLink>
                                </div>
                            ) : (
                                <NavLink to={'/schedule'}>Schedule</NavLink>
                            )}
                        <div className="mx-2 px-2">
                            <p>Hello, {props.user.name}</p>
                            <p>Your Role in Company is : <span className="text-yellow-400">{props.user.type}</span></p>
                        </div>
                            <RedButton onClick={props.logOut} label='Log Out' />
                    </div>

                )
                :
                (
                <div className="grow text-gray-100 flex items-center justify-center">
                    <NavLink to={'/sign-in'}>Sign In</NavLink>
                </div>
                )
            }
        </div>
    )
}