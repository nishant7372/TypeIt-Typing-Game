import React from "react";

const ResultsTable = ({ WPM, timeElapsed, accuracy, id, date, time ,difficulty}) => {

  var diff = ["Medium", "Easy", "Hard"];

  return (
    <table className="table-auto mt-4 border-4">
      <thead className="bg-purple-500">
        <tr className="text-white">
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Time</th>
          <th className="px-4 py-2">WPM</th>
          <th className="px-4 py-2">Accuracy</th>
          <th className="px-4 py-2">Time Taken</th>
          <th className="px-4 py-2">Difficulty</th>

        </tr>
      </thead>
      <tbody>
        <tr className="bg-purple-500 text-center border-4">
          <td className="border-b border-purple-500 px-4 py-2 text-white">
            {date}
          </td>
          <td
            className="border-b border-purple-500 px-4 py-2 text-white"
            style={{ whiteSpace: "nowrap" }}
          >
            {time}
          </td>
          <td className="border-b border-purple-500 px-4 py-2 text-white">
            {WPM}
          </td>
          <td className="border-b border-purple-500 px-4 py-2 text-white">
            {accuracy.toFixed(2)} %
          </td>
          <td className="border-b border-purple-500 px-4 py-2 text-white">
            {timeElapsed} sec
          </td>
          <td className="border-b border-purple-500 px-4 py-2 text-white">
            {diff[difficulty]}
          </td>

        </tr>
      </tbody>
    </table>
  );
};

export default ResultsTable;
