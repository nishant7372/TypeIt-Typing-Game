import React from 'react'

function Accuracy({ accuracy }) {
    return (
        <div className="font-bold bg-pink-500 ml-10 p-3 rounded-xl">
            <span className="font-semibold bg-pink-500 text-xl sm:text-5xl tracking-tight text-white">
                Accuracy: {accuracy.toFixed(2)} %
            </span>
        </div>
    )
}

export default Accuracy