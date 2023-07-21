import React from "react";

const ResultsTable = ({ WPM, timeElapsed, accuracy }) => {
  return (
    <table className="table-auto w-1/2 mt-4 border-4">
      <thead className="bg-purple-500">
        <tr className="text-white">
          <th className="px-4 py-2">WPM</th>
          <th className="px-4 py-2">Time</th>
          <th className="px-4 py-2">Accurracy</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-purple-500 text-center border-4">
          <td className="border-b border-purple-500 px-4 py-2 text-white">
            {WPM}
          </td>
          <td
            className="border-b border-purple-500 px-4 py-2 text-white"
            style={{ whiteSpace: "nowrap" }}
          >
            {timeElapsed} seconds
          </td>
          <td className="border-b border-purple-500 px-4 py-2 text-white">
            {accuracy.toFixed(2)} %
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ResultsTable;
