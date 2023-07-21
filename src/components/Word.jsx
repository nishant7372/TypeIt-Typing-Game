import React from "react";

const Word = ({ text, active, correct, incorrect }) => {
  if (correct) {
    return (
      <span
        className="font-bold text-green-500 text-lg renderlessBlur"
        style={{ fontSize: "2.2rem" }}
      >
        {" "}
        {text}{" "}
      </span>
    );
  }
  if (incorrect) {
    return (
      <span
        className="font-bold text-red-400 text-lg renderlessBlur"
        style={{ fontSize: "2.2rem" }}
      >
        {" "}
        {text}{" "}
      </span>
    );
  }
  if (active) {
    return (
      <span
        className="font-bold text-white text-2xl renderlessBlur"
        style={{ fontSize: "3.4rem" }}
      >
        {" "}
        {text}
      </span>
    );
  }

  return (
    <span
      className="renderlessBlur text-lg text-white"
      style={{ fontSize: "2.2rem" }}
    >
      {" "}
      {text}{" "}
    </span>
  );
};

export default Word;
