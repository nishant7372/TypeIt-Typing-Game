import React from 'react'

function Progress({ progress }) {
    return (
        <div className="font-bold bg-red-500 p-3 mb-10 rounded-xl">
            <span className="font-semibold bg-red-500 text-xl sm:text-5xl tracking-tight text-white">
                Completed : {progress} % 
            </span>
        </div>
    )
}

export default Progress