import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizSystem = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], correct: 2 },
    { question: 'Which is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Mars', 'Venus'], correct: 1 },
    { question: 'Who developed the theory of relativity?', options: ['Newton', 'Einstein', 'Galileo', 'Tesla'], correct: 1 },
    // Add more questions as needed
  ];

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz Over! Your score is ${score + 1} / ${questions.length}`);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-28 px-6 md:pt-20 md:pb-32 md:px-12">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 p-8 shadow-lg rounded-lg max-w-3xl mx-auto text-white"
      >
        {!quizStarted ? (
          <>
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
              Quiz System
            </h2>
            <p className="text-gray-400 mb-6">
              Test your knowledge with AI-powered quizzes and receive instant feedback on your answers.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="w-full py-3 text-lg font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:w-auto"
            >
              Start Quiz
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex].question}</h3>
            <div className="mb-6">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full mb-6 py-2 text-lg font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:w-auto"
                >
                  {/* Add numbering (1, 2, 3, 4) to each option */}
                  {index + 1}. {option}
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 mb-4">
              <div className="w-full bg-gray-600 rounded-full">
                <div
                  className="bg-gray-500 h-2 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Score Display */}
            <div className="mt-6 text-lg">
              <span className="text-gray-400">Score: </span>
              <span className="text-gray-300">{score}</span> / {questions.length}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default QuizSystem;
