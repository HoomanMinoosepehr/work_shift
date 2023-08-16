import { NavLink } from "react-router-dom";
import { get } from "../request";
import { RedButton } from "./Button";


export function NavBar(props) {
    
    const onClick = () => {
        get('sessions')
         .then(data => console.log(data))
    }

    return (
        <div className="flex flex-row justify-around py-3">
            <div className="">
                <NavLink to={'/'}>Home</NavLink>
            </div>
            
            {
                props.user ? (
                    <div className="flex flex-row justify-around">
                        { props.user.type === 'Owner' ? (
                            <div className="flex flex-row justify-around">
                                <NavLink to={'/managers'}>Managers</NavLink>
                                <NavLink to={'/employees'}>Employees</NavLink>
                            </div>
                        ) : props.user.type === 'Manager' ? (
                            <NavLink to={'/employees'}>Employees</NavLink>
                        ) : (
                            <NavLink to={'/schedule'}>Schedule</NavLink>
                        )}
                        <div className="mx-2">
                            <p>Hello, {props.user.name}</p>
                            <p>Your Role in Company is : <span className="text-green-600">{props.user.type}</span></p>
                        </div>
                        <RedButton onClick={props.logOut} label='Log Out' />
                    </div>

                )
                :
                (
                <div>
                    <NavLink to={'/sign-in'}>Sign In</NavLink>
                </div>
                )
            }
        </div>
    )
}