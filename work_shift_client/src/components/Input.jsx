


export function Input(props) {


    return (
        <div className="my-2">
            <label>{props.label}: </label><br />
            <input 
            className="border rounded-md px-2 py-1" 
            type={props.type || 'text'} 
            name={props.name || props.id} 
            id={props.id} 
            placeholder={props.placeholder} 
            onChange={props.onChange}/>
        </div>
    )
}