import { useEffect, useState } from "react";
import axios from "axios";
// spinner
import { SpinnerDotted } from "spinners-react";

// components
import Accuracy from "../../components/Accuracy";
import Word from "../../components/Word";
import Timer from "../../components/Timer";
import Header from "../../components/Header";
import ResultsModal from "../../components/ResultsModal";
import { v4 as uuid } from "uuid";
import SimpleButton from "../../components/button/simpleButton";
import { useFirestore } from "../../hooks/application/useFirestore";
import { useCollection } from "../../hooks/application/useCollection";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function Application() {
  const { user } = useAuthContext();
  useCollection();
  const { addDocument } = useFirestore();
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

  // game finished
  const [gameFinished, setGameFinished] = useState(false); //state for game finished

  const getWords = async () => {
    //data fetching

    setLoading(true); //data is loading
    let x = Math.floor(Math.random() * 10 + 1);
    if (x < 3) x = 3;
    const tempUrl = "http://metaphorpsum.com/paragraphs/1/" + x.toString();
    const { data } = await axios.get(tempUrl);
    const fetchParagraph = data.split(" ");
    setWords(fetchParagraph);
    setLoading(false);
  };

  const minutes = timeElapsed / 60; // Time cal

  const WPM = correctWords.length / minutes; // WPM cal

  const accuracy =
    (correctWords.length / (correctWords.length + incorrectWords.length)) * 100;

  useEffect(() => {
    localStorage.setItem("storage", JSON.stringify(result));
  }, [result]);

  const checkInput = (value) => {
    if (activeWordIndex === words.length) {
      return;
    }

    setStartCounting(true); // timer starts

    if (value.endsWith(" ")) {
      // space means next word

      if (activeWordIndex === words.length - 1 || timeElapsed >= 60) {
        setStartCounting(false); // stop the counting

        setGameFinished(true); // game is finished

        // setting storage

        const fixedResults = {
          WPM: WPM.toFixed(2),
          timeElapsed: timeElapsed,
          id: uuid(),
          uid: user.uid,
        };

        addDocument("PracticeResults", fixedResults);
      } else {
        setUserInput("");
      }

      setActiveWordIndex(activeWordIndex + 1); // active index increment

      const word = value.trim(); //space removal

      if (word === words[activeWordIndex]) {
        //correct word
        setCorrectWords([...correctWords, activeWordIndex]);
      } else {
        //incorrect word
        setIncorrectWords([...incorrectWords, activeWordIndex]);
      }
    } else {
      // if this is not the end word update the state input state
      setUserInput(value);
    }
  };

  useEffect(() => {
    if (timeElapsed >= 60) checkInput(" ");
  }, [timeElapsed]);

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

  return (
    <>
      <div
        className="flex flex-col justify-start md:justify-center items-center"
        style={{ marginTop: "10rem" }}
      >
        {loading ? ( // when it start loading
          <div className="flex justify-center">
            <div className="spinner">
              <SpinnerDotted
                style={{ width: "10rem", height: "10rem", color: "blue" }}
              />
            </div>
          </div>
        ) : words.length === 0 ? ( // when it is empty
          getWords()
        ) : gameFinished ? ( // now word are filled then check if game is finished or not
          <>
            <div className="flex flex-col items-center">
              <Timer
                startCounting={startCounting}
                correctWords={correctWords.length}
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
              />

              <Accuracy accuracy={accuracy} />

              <p
                className="w-1/2 p-8 renderBlur leading-relaxed"
                style={{ border: "2px solid red" }}
              >
                {words.map(
                  (
                    word,
                    index // final render of words
                  ) => (
                    <Word
                      key={index}
                      text={word}
                      active={index === activeWordIndex}
                      correct={correctWords.includes(index)}
                      incorrect={incorrectWords.includes(index)}
                    />
                  )
                )}
              </p>
            </div>

            <div
              className="bg-green-500 border-2 border-gray-200
            rounded w-1/2 py-2 px-4 mt-12 text-white text-center text-xl
            focus:outline-none focus:bg-white focus:border-green-500"
              style={{ fontSize: "2.2rem" }}
            >
              Game Finished !
            </div>

            <div className="bottom">
              <SimpleButton
                content="Restart Game"
                type={"restartButton"}
                action={restartGame}
                buttonStyle={{
                  fontSize: "2rem",
                  padding: "0.5rem 1rem",
                  marginTop: "3rem",
                  cursor: "pointer",
                }}
              />
              <ResultsModal WPM={WPM} timeElapsed={timeElapsed} />
            </div>
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

              <div
                className="w-1/2 p-8 rounded-lg renderBlur"
                style={{ lineHeight: 4 }}
              >
                {words.map((word, index) => (
                  <Word
                    key={index}
                    text={word}
                    active={index === activeWordIndex}
                    correct={correctWords.includes(index)} // if it includes in correct word category
                    incorrect={incorrectWords.includes(index)} // if it includes in correct word category
                  />
                ))}
              </div>
            </div>

            <input
              autoFocus
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 mt-12 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
              type="text"
              value={userInput}
              onChange={(e) => checkInput(e.target.value)}
              placeholder="start typing..."
              style={{ fontSize: "2.6rem" }}
            />

            <SimpleButton
              content="Restart Game"
              type={"restartButton"}
              action={restartGame}
              buttonStyle={{
                fontSize: "2rem",
                padding: "0.5rem 1rem",
                marginTop: "3rem",
                cursor: "pointer",
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
