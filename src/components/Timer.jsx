import React, { useEffect } from "react";
import Progress from "./Progress";
import Accuracy from "./Accuracy";
import { useState } from "react";
import { doc } from "firebase/firestore";

const Timer = ({
  startCounting,
  correctWords,
  timeElapsed,
  setTimeElapsed,
  progress,
  accuracy,
  timeLimit,
  setTimeLimit,
  WPM,
  setWPM,
  difficulty,
  setDifficulty,
  getWords
}) => {
  useEffect(() => {
    if (startCounting) {
      const interval = setInterval(() => {
        setTimeElapsed((oldSpeed) => oldSpeed + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startCounting]);

  const [minutes, setMinutes] = useState(timeElapsed / 60);

  useEffect(() => {
    setMinutes(timeElapsed / 60);
  }, [timeElapsed]);

  useEffect(() => {
    setWPM(correctWords / minutes);
  }, [correctWords, minutes]);

  let time = true;

  if (timeElapsed >= (timeLimit * 0.8)) time = false;
  let chooseTime = true;
  if (timeElapsed > 0) chooseTime = false;
  let choosen = -1;
  if (chooseTime) {
    if (document.querySelector("#choose")) {
      choosen = document.querySelector("#choose").value;
      setTimeLimit(choosen);
    }
  }

  return (<>
    <div className="flex justify-center items-center mb-12">
      {chooseTime ? (
        <div className="choose">
          <div
            className="bg-blue-500 p-3 rounded-xl mr-10 "
            style={{ display: "flex", alignItems: "center" }}
          >
            <span className="font-semibold bg-blue-500 mr-4 text-xl sm:text-5xl tracking-tight text-white">
              <label className="mr-4" htmlFor="choose">
                {" "}
                Time{" "}
              </label>
              <select
                className="m-auto pl-2 !outline-none text-4xl text-black"
                id="choose"
                defaultValue={15}
              >
                <option value="15">15 sec</option>
                <option value="30">30 sec</option>
                <option value="45">45 sec</option>
                <option value="60">60 sec</option>
              </select>
            </span>
          </div>
        </div>
      ) : time ? (
        <div className="bg-blue-500 p-3 rounded-xl mr-10 ">
          <span className="font-semibold bg-blue-500 text-xl sm:text-5xl tracking-tight text-white">
            Time: {timeElapsed}
          </span>
        </div>
      ) : (
        <div className="bg-red-500 p-3 rounded-xl mr-10 ">
          <span className="font-semibold bg-red-500 text-xl sm:text-5xl tracking-tight text-white">
            Time: {timeElapsed}
          </span>
        </div>
      )}

      <div className="font-bold bg-orange-500 p-3 rounded-xl">
        <span className="font-semibold bg-orange-500 text-xl sm:text-5xl tracking-tight text-white">
          WPM: {(WPM | 0).toFixed(2)}
        </span>
      </div>

        <Accuracy 
          accuracy = {accuracy} 
          timeElapsed = {timeElapsed}
          getWords = {getWords}
          difficulty={difficulty}
          setDifficulty= {setDifficulty}
         />
      
    </div>
      <Progress progress = {progress} />
      </>
  );
};

export default Timer;
