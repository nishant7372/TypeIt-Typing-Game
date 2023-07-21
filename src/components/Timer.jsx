import React, { useEffect } from "react";
import Progress from "./Progress";
import Accuracy from "./Accuracy";

const Timer = ({
  startCounting,
  correctWords,
  timeElapsed,
  setTimeElapsed,
  settimeLimit,
  progress,
  accuracy
}) => {
  useEffect(() => {
    if (startCounting) {
      const interval = setInterval(() => {
        setTimeElapsed((oldSpeed) => oldSpeed + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startCounting]);

  const minutes = timeElapsed / 60;
  const WPM = correctWords / minutes;
  var time = true;
  if (timeElapsed > 40) time = false;
  var chooseTime = true;
  if(timeElapsed > 0) chooseTime = false;
  var choosen = -1;
  if(chooseTime) {
    if (document.querySelector('#choose')) {
      choosen = document.querySelector('#choose').value;
      settimeLimit(choosen);
    }
  }

  return (<>
    <div className="flex justify-center items-center mb-12">
      {chooseTime ? (
        <div className="choose">
          <div className="bg-blue-500 p-3 rounded-xl mr-10 ">
            <span className="font-semibold bg-blue-500 mr-4 text-xl sm:text-5xl tracking-tight text-black">
              <label className = "mr-4" htmlFor = "choose"> Choose Time   </label>
              <select className = "m-auto pl-2 !outline-none text-4xl" id="choose" defaultValue={15}>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
            </span>
          </div>
        </div>
      )
      : time ? (
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

        <Accuracy accuracy = {accuracy} />
      
    </div>
      <Progress progress = {progress} />
      </>
  );
};

export default Timer;
