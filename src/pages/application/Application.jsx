import { useEffect, useState } from "react";
import axios from "axios";
// spinner
import { SpinnerDotted } from "spinners-react";

// components
import Word from "../../components/Word";
import Timer from "../../components/Timer";
import Header from "../../components/Header";
import ResultsModal from "../../components/ResultsModal";
import { v4 as uuid } from "uuid";

export default function Application() {
  // words states

  const [userInput, setUserInput] = useState(""); // state for user input

  const [words, setWords] = useState([]); // state for collecting words

  const [activeWordIndex, setActiveWordIndex] = useState(0); // state which show current word

  const [correctWords, setCorrectWords] = useState([]); //state for correct word
  const [incorrectWords, setIncorrectWords] = useState([]); // state for incorrect word

  // timer states
  const [startCounting, setStartCounting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // loading
  const [loading, setLoading] = useState(false);

  // result
  const [result, setResult] = useState(
    JSON.parse(localStorage.getItem("storage") || "[]")
  );

  // game finished
  const [gameFinished, setGameFinished] = useState(false); //state for game finished

  const getWords = async () => {
    //data fetching

    setLoading(true); //data is loading

    const { data } = await axios.get(
      "https://random-word-api.herokuapp.com/all"
    );

    const newList = shuffle(data); // making a new list of shuffle words

    setWords(newList.slice(0, 20)); // selecting 20 word from it

    setLoading(false); //data loaded
  };

  const minutes = timeElapsed / 60; // Time cal
  const WPM = correctWords.length / minutes; // WPM cal

  useEffect(() => {
    localStorage.setItem("storage", JSON.stringify(result));
  }, [result]);

  const shuffle = (array) => {
    // are shuffling function
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkInput = (value) => {
    if (activeWordIndex === words.length) {
      return;
    }

    setStartCounting(true); // timer starts

    if (value.endsWith(" ")) {
      // space means next word

      if (activeWordIndex === words.length - 1) {
        setStartCounting(false); // stop the counting

        setGameFinished(true); // game is finished

        // setting storage

        const fixedResults = {
          WPM: WPM.toFixed(2),
          timeElapsed: timeElapsed,
          id: uuid(),
        };

        const newResult = [...result, fixedResults];

        setResult(newResult);

        localStorage.setItem("storage", JSON.stringify(result)); //local storage
      } else {
        setUserInput("");
      }

      setActiveWordIndex(activeWordIndex + 1); // active index increment

      const word = value.trim(); //space removal

      if (word === words[activeWordIndex]) {
        //correct word
        setCorrectWords([...correctWords, word]);
      } else {
        //incorrect word
        setIncorrectWords([...incorrectWords, words[activeWordIndex]]);
      }
    } else {
      // if this is not the end word update the state input state
      setUserInput(value);
    }
  };

  const restartGame = () => {
    // game reset
    setGameFinished(false);
    getWords();
    setUserInput("");
    setActiveWordIndex(0);
    setTimeElapsed(0);
    setCorrectWords([]);
    setIncorrectWords([]);
    setStartCounting(false);
  };

  // first click the getword button -> spinner start spinning  -> words are loaded( word array )

  return (
    <>
      <Header restartGame={restartGame} />
      <div className="flex flex-col h-screen justify-start mt-12 md:justify-center items-center">
        {loading ? ( // when it start loading
          <div className="flex justify-center">
            <div className="spinner">
              <SpinnerDotted />
            </div>
          </div>
        ) : words.length === 0 ? ( // when it is empty
          <button
            className="bg-green-500 p-5 rounded-xl text-white"
            onClick={getWords}
          >
            Get Words
          </button>
        ) : gameFinished ? ( // now word are filled then check if game is finished or not
          <>
            <div className="flex flex-col items-center">
              <Timer
                startCounting={startCounting}
                correctWords={correctWords.length}
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
              />

              <p className="w-1/2 border-green-500 border-4 p-8 rounded-lg">
                {words.map(
                  (
                    word,
                    index // final render of words
                  ) => (
                    <Word
                      key={index}
                      text={word}
                      active={index === activeWordIndex}
                      correct={correctWords.includes(word)}
                      incorrect={incorrectWords.includes(word)}
                    />
                  )
                )}
              </p>
            </div>

            <div
              className="bg-green-500 border-2 border-gray-200
            rounded w-1/2 py-2 px-4 mt-12 text-white text-center text-xl
            focus:outline-none focus:bg-white focus:border-green-500"
            >
              Game Finished !
            </div>

            <ResultsModal result={result} WPM={WPM} timeElapsed={timeElapsed} />
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <Timer
                startCounting={startCounting}
                correctWords={correctWords.length}
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
              />

              <p className="w-1/2 border-green-500 border-4 p-8 rounded-lg">
                {words.map((word, index) => (
                  <Word
                    key={index}
                    text={word}
                    active={index === activeWordIndex}
                    correct={correctWords.includes(word)} // if it includes in correct word category
                    incorrect={incorrectWords.includes(word)} // if it includes in correct word category
                  />
                ))}
              </p>
            </div>

            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 mt-12 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 lowercase"
              type="text"
              value={userInput}
              onChange={(e) => checkInput(e.target.value.toLowerCase())}
              placeholder="Type here..."
            />

            <ResultsModal result={result} WPM={WPM} timeElapsed={timeElapsed} />
          </>
        )}
      </div>
    </>
  );
}
