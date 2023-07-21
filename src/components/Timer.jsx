import React, { useEffect } from "react";

const Timer = ({
  startCounting,
  correctWords,
  timeElapsed,
  setTimeElapsed,
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
  var time = false;
  if (timeElapsed > 40) time = true;

  return (
    <div className="flex justify-center items-center mb-12">
      {time == false ? (
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
    </div>
  );
};

export default Timer;
