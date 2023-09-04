


export function Alert(props) {
    const bgColor = {
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-700'
    }


    return (
        <div className={`absolute
        left-1/2
        top-20
        -translate-x-1/2
        border
        rounded-md
        py-4
        px-5
        flex
        flex-col
        content-center
        items-center
        ${bgColor[props.color]}
        bg-opacity-70
        text-white`}>

            {Array.isArray(props.message) ? (
                props.message.map((message, index) => (
                    <p key={index}>{message}</p>
                ))
            ) : (
                <p>{props.message}</p>
            )}
            <button className="border
            rounded-md
            w-fit
            py-1
            px-2
            mt-5
            bg-white
            text-green-700
            hover:bg-green-700
            hover:text-white
            hover:scale-125
            duration-300"
            onClick={() => props.setAlert(null)}
            >
                Ok!
            </button>

        </div>
    )
}