import React from 'react'

function Accuracy({ accuracy }) {
    return (
        <div className="font-bold bg-slate-500 p-3 rounded-xl mb-4">
            <span className="font-semibold bg-slate-200text-xl sm:text-5xl tracking-tight text-white">
                Accuracy : {accuracy.toFixed(2)}
            </span>
        </div>
    )
}

export default Accuracy