import React from 'react'

function Accuracy({ accuracy, timeElapsed, getWords, difficulty, setDifficulty }) {

    function thisisHard() {
        if(document.querySelector('#difficulty')){
            const e = document.querySelector('#difficulty').value;
            setDifficulty(e);
        }
    }
    return (
        timeElapsed != 0 ? (
            <div className="font-bold bg-pink-500 ml-10 p-3 rounded-xl">
                <span className="font-semibold bg-pink-500 text-xl sm:text-5xl tracking-tight text-white">
                    Accuracy: {accuracy.toFixed(2)} %
                </span>
            </div>
        ) : (
                <div
                    className="bg-pink-500 p-3 ml-10 rounded-xl mr-10 "
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <span className="font-semibold bg-pink-500 mr-4 text-xl sm:text-5xl tracking-tight text-white">
                        <label className="mr-4" htmlFor="difficulty">
                            {" "}
                            Difficulty{" "}
                        </label>
                        <select
                            className="m-auto pl-2 !outline-none text-4xl text-black"
                            id="difficulty"
                            defaultValue= {difficulty}
                            onChange={() => {
                                thisisHard();
                            }}
                        >
                            <option value={1}>Easy</option>
                            <option value={0}>Medium</option>
                        </select>
                    </span>
                </div>
        )
    )
}

export default Accuracy