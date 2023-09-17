import { useNavigate } from "react-router-dom";



export function OwnerAuth(props) {
    const navigate = useNavigate();

    if (props.user != null) {
        if (props.user.type === 'Owner'){
            return(props.page)
        } else {
            navigate('/')
            props.setAlert({color: 'red', message: "This page is only accessible for the owner!"});
            return null
        }
    } else {
        navigate('/')
        props.setAlert({ color: 'red', message: 'You are not allowed to use this page!'});
        return null
    }

}