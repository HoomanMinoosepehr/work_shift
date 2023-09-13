import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get } from "../request"


export function Account(props) {
    const [account, setAccount] = useState(null)
    const id = useParams()

    useEffect(() => {
        switch(props.user.type){
            case 'Owner':
                get(`company/${id}`)
                    .then(data => {
                        
                    })
                break;
            case 'Manager':
                console.log('manager')
                break;
            case 'Employee':
                console.log('employee')
                break;
        }
        
    }, [])


    return (
        <div>

        </div>
    )
}