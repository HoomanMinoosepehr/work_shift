

export function NotFound() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-1/2 h-1/4 border-4 border-red-500 rounded-2xl p-5">
                <p className="text-red-500 text-8xl">404</p>
                <p className="text-red-700 text-5xl"> Address NOT found!</p>
                <p className="text-red-700 text-2xl">Please check the address.</p>
            </div>
        </div>
    )
}