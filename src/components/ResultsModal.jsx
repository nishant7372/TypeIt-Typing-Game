import React, { useState } from "react";
import ResultsTable from "./ResultsTable";
import SimpleButton from "./button/simpleButton";
import { useApplicationContext } from "../hooks/context/useApplicationContext";

const ResultsModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { practiceResults } = useApplicationContext();
  const [result, setResult] = useState(practiceResults);
  return (
    <>
      <SimpleButton
        content="Result"
        type={"saveButton"}
        action={() => setShowModal(true)}
        buttonStyle={{
          fontSize: "2rem",
          padding: "0.5rem 1rem",
          marginTop: "3rem",
          cursor: "pointer",
          marginLeft: "2rem",
        }}
      />
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
            style={{
              fontSize: "2rem",
            }}
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Results</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div
                  className="relative flex flex-col justify-center items-center m-5"
                  style={{
                    maxHeight: "60vh",
                    overflow: "auto",
                  }}
                >
                  {result.map(({ WPM, timeElapsed, id }) => (
                    <ResultsTable
                      WPM={WPM}
                      timeElapsed={timeElapsed}
                      key={id}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ fontSize: "2rem" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ResultsModal;
