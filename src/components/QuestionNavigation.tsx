import { useState, useMemo } from "react";
import { Question } from "../data/questions";

interface QuestionNavigationProps {
  questions: Question[];
  answers: Map<number, string[]>;
  showAnswers: boolean;
  correctAnswers: Set<number>;
}

export function QuestionNavigation({
  questions,
  answers,
  showAnswers,
  correctAnswers,
}: QuestionNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToQuestion = (questionId: number) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsOpen(false); // Close drawer when clicked
    }
  };

  // Count attempted / not attempted
  const { attemptedCount, notAttemptedCount } = useMemo(() => {
    let attempted = 0;
    for (const q of questions) {
      if (answers.has(q.id)) attempted++;
    }
    return {
      attemptedCount: attempted,
      notAttemptedCount: questions.length - attempted,
    };
  }, [questions, answers]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md shadow-md hover:bg-slate-800 transition"
      >
        {/* 3-line menu icon */}
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </button>

      {/* Overlay (dark background) */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel (left side) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 p-6 flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">
            Question Navigation
          </h2>

          {/* Summary Section */}
          <div className="mb-4 text-sm font-medium text-slate-700 flex justify-between">
            <span className="text-green-600">Attempted: {attemptedCount}</span>
            <span className="text-red-600">Not Attempted: {notAttemptedCount}</span>
          </div>

          {/* Grid of Question Buttons */}
          <div className="grid grid-cols-5 gap-3 sm:grid-cols-6">
            {questions.map((question, index) => {
              const isAnswered = answers.has(question.id);
              const isCorrect = showAnswers && correctAnswers.has(question.id);
              const isIncorrect = showAnswers && isAnswered && !isCorrect;

              const baseStyles =
                "w-full aspect-square rounded-md border-2 font-semibold text-sm transition-all";

              let colorStyles =
                "border-slate-300 text-slate-600 hover:bg-slate-100";
              if (showAnswers) {
                if (isCorrect)
                  colorStyles =
                    "border-green-500 text-green-600 bg-green-50 hover:bg-green-100";
                else if (isIncorrect)
                  colorStyles =
                    "border-red-500 text-red-600 bg-red-50 hover:bg-red-100";
              } else if (isAnswered)
                colorStyles =
                  "border-slate-900 text-slate-900 bg-slate-50 hover:bg-slate-100";

              return (
                <button
                  key={question.id}
                  onClick={() => scrollToQuestion(question.id)}
                  className={`${baseStyles} ${colorStyles}`}
                  title={`Question ${index + 1}${
                    isAnswered ? " (Answered)" : ""
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-6 text-center text-sm text-slate-600 border-t border-slate-200 pt-4">
          Made with <span className="text-red-500">♥</span> by{" "}
          <a
            href="https://tulugukishorebabu.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-900 underline hover:text-blue-600 transition"
          >
            Kishore
          </a>
        </footer>
      </div>
    </>
  );
}
