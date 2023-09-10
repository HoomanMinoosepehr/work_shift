

export function GreenButton(props) {
    return (
        <button 
        className="border 
        border-green-700 
        rounded-md px-2 py-1
        mt-2
        text-green-700 
        bg-green-100 
        bg-opacity-70
        hover:text-green-100 
        hover:bg-green-700 
        hover:scale-110
        duration-300"
        onClick={props.onClick}
        >{props.label}</button>
    )
}

export function RedButton(props) {

    return (
        <button 
        className="border 
        border-red-700 
        rounded-md px-2 py-1 
        text-red-700 
        bg-red-100 
        bg-opacity-70
        hover:text-yellow-400 
        hover:bg-red-700 
        hover:border-black
        hover:scale-110
        duration-300"
        onClick={props.onClick}
        >{props.label}</button>
    )

}

export function YellowButton(props) {
    return (
        <button 
        className="border 
        border-red-700 
        rounded-md px-2 py-1 
        text-red-700 
        bg-yellow-400 
        bg-opacity-70
        hover:text-white 
        hover:bg-yellow-700 
        hover:border-black
        hover:scale-110
        duration-300"
        onClick={props.onClick}
        >{props.label}</button>
    )
}