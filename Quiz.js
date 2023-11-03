import React, { useState, useEffect, useRef } from "react";
import QuizData from "../QuizData.json"; 
import { useLocation } from "react-router-dom";
import "../App.css"; 



function shuffleArray(array) {
  for (let k = array.length - 1; k > 0; k--) {
    const p = Math.floor(Math.random() * (k + 1));
    [array[k], array[p]] = [array[p], array[k]];
  }
  return array;
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const timerRef = useRef(null);
  const location = useLocation();
  const name = location.state.name;

  useEffect(() => {
    const shuffledQuizData = shuffleArray(QuizData);
    setRemainingTime(15);
    setSelectedAnswer(null);

 
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

   
    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          handleAnswerButtonClick(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [currentQuestion]);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < QuizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">
          Welcome, {name}! Let's Play the Quiz
        </h1>
        {showScore ? (
          <div className="score-section">
            <p className="text-xl font-semibold mb-4 text-indigo-700">
              Your Score: {score} / {QuizData.length}
            </p>
            <p className="text-gray-700">Thank you for playing!</p>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <p className="text-sm font-semibold mb-2 text-indigo-700">
                  Question {currentQuestion + 1} / {QuizData.length}
                </p>
              </div>
              <div className="question-card">
                <p className="text-lg font-medium text-indigo-700">
                  {QuizData[currentQuestion].question}
                </p>
              </div>
            </div>

            <div className="answer-section">
              {QuizData[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-2 rounded-md cursor-pointer ${
                    selectedAnswer === option ? "bg-blue-500" : "bg-indigo-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="answerOptions"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => setSelectedAnswer(option)}
                  />
                  <span className="ml-2 text-indigo-700">{option}</span>
                </label>
              ))}
            </div>
            <div className="timer-section">
              <p className="text-sm text-gray-600 mt-2">
                Time Remaining: {remainingTime} seconds
              </p>
            </div>
            <button
              onClick={() =>
                handleAnswerButtonClick(
                  selectedAnswer === QuizData[currentQuestion].answer
                )
              }
              className={`mt-4 p-2 w-full text-white bg-indigo-700 rounded-md hover:bg-indigo-800 ${
                selectedAnswer === null ? "cursor-not-allowed" : ""
              }`}
              disabled={selectedAnswer === null}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
