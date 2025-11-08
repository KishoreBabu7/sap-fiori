import { useState, useEffect, useMemo } from "react";
import { QuizQuestion } from "./components/QuizQuestion";
import { QuestionNavigation } from "./components/QuestionNavigation";
import { questions as originalQuestions } from "./data/questions";
import { shuffleArray } from "./utils/shuffle";
import { supabase } from "./lib/supabase";
import { RefreshCw, Send, AlertTriangle } from "lucide-react";

function App() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Map<number, string[]>>(new Map());
  const [showAnswers, setShowAnswers] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [userId] = useState(
    () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  const questions = useMemo(() => {
    return shuffleArray(
      originalQuestions.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
  }, []);

  const correctAnswers = useMemo(() => {
    const correct = new Set<number>();
    questions.forEach((q) => {
      const userAnswers = answers.get(q.id) || [];
      if (
        userAnswers.length === q.correctAnswers.length &&
        userAnswers.every((ans) => q.correctAnswers.includes(ans))
      ) {
        correct.add(q.id);
      }
    });
    return correct;
  }, [questions, answers]);

  const stats = useMemo(() => {
    const answered = answers.size;
    const correct = correctAnswers.size;
    const incorrect = answered - correct;
    return { answered, correct, incorrect };
  }, [answers, correctAnswers]);

  // 🔒 Fullscreen handling + warnings
  useEffect(() => {
    const handleFullscreenExit = () => {
      if (!started) return;

      if (!document.fullscreenElement) {
        setWarningCount((prev) => {
          const newCount = prev + 1;
          if (newCount < 3) {
            setShowWarningPopup(true);
          } else {
            alert("You have exited fullscreen 3 times. The quiz will restart.");
            window.location.reload();
          }
          return newCount;
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && started) handleFullscreenExit();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && started) handleFullscreenExit();
    };

    document.addEventListener("fullscreenchange", handleFullscreenExit);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [started]);

  const handleOptionToggle = (questionId: number, option: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    setAnswers((prev) => {
      const newAnswers = new Map(prev);
      const current = newAnswers.get(questionId) || [];

      if (question.correctAnswers.length === 1) {
        newAnswers.set(questionId, [option]);
      } else {
        if (current.includes(option)) {
          const filtered = current.filter((o) => o !== option);
          if (filtered.length === 0) {
            newAnswers.delete(questionId);
          } else {
            newAnswers.set(questionId, filtered);
          }
        } else {
          newAnswers.set(questionId, [...current, option]);
        }
      }

      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    if (answers.size === 0) {
      alert("Please answer at least one question before submitting.");
      return;
    }

    const confirmSubmit = window.confirm(
      `You have answered ${answers.size} out of ${questions.length} questions. Submit now?`
    );
    if (!confirmSubmit) return;

    setShowAnswers(true);

    try {
      const { data: attemptData, error: attemptError } = await supabase
        .from("quiz_attempts")
        .insert({
          user_id: userId,
          score: stats.correct,
          total_questions: questions.length,
        })
        .select()
        .maybeSingle();

      if (attemptError) {
        console.error("Error saving attempt:", attemptError);
        return;
      }

      if (attemptData) {
        const responses = Array.from(answers.entries()).map(
          ([questionId, selectedOptions]) => ({
            attempt_id: attemptData.id,
            question_number: questionId,
            selected_options: selectedOptions,
            is_correct: correctAnswers.has(questionId),
          })
        );

        const { error: responsesError } = await supabase
          .from("question_responses")
          .insert(responses);

        if (responsesError)
          console.error("Error saving responses:", responsesError);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to restart the quiz? All your answers will be lost."
    );
    if (confirmReset) window.location.reload();
  };

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setStarted(true);
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
      setStarted(true);
    }
  };

  const reEnterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setShowWarningPopup(false);
    } catch (error) {
      console.error("Re-enter fullscreen failed:", error);
    }
  };

  // 🟢 Start Page (Before Fullscreen)
  if (!started) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-amber-100 rounded-full">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-slate-900">
              SAP Fiori Certification Quiz
            </h1>
            <p className="text-lg text-slate-600">
              This quiz will be conducted in fullscreen mode to ensure focus and
              prevent distractions.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 space-y-3 text-sm text-slate-700">
            <h3 className="font-semibold text-slate-900 text-base mb-3">
              Quiz Guidelines:
            </h3>
            <ul className="space-y-2">
              <li>All 61 questions will be displayed on a single page</li>
              <li>Questions and options are randomized on each refresh</li>
              <li>You can answer questions in any order</li>
              <li>Correct answers will be shown after submission</li>
              <li>Your progress will be tracked throughout the quiz</li>
            </ul>
          </div>

          <button
            onClick={enterFullscreen}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Quiz in Fullscreen
          </button>
        </div>
      </div>
    );
  }

  // 🟡 Main Quiz Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 flex flex-col justify-between">
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-10 pb-24">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            SAP Fiori Application Developer Certification
          </h1>
          <p className="text-lg text-slate-600">Exam Code: C_FIORD_2502</p>
        </header>

        <div className="flex flex-col items-center space-y-8">
          {/* Navigation Section */}
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  All Questions ({questions.length})
                </h2>
                <p className="text-slate-600 mt-1">
                  Answer questions in any order. Questions and options are randomized.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
                {!showAnswers && (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>

            <QuestionNavigation
              questions={questions}
              answers={answers}
              showAnswers={showAnswers}
              correctAnswers={correctAnswers}
            />
          </div>

          {/* Questions */}
          <div className="w-full space-y-8">
            {questions.map((question, index) => (
              <QuizQuestion
                key={question.id}
                question={question}
                questionIndex={index + 1}
                selectedOptions={answers.get(question.id) || []}
                onOptionToggle={(option) =>
                  handleOptionToggle(question.id, option)
                }
                showAnswers={showAnswers}
              />
            ))}
          </div>
        </div>
      </main>

      {/* ✅ Fixed Footer Progress Bar */}
      {!showAnswers && (
        <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-white py-3 px-6 flex justify-between items-center shadow-lg">
          <p className="text-sm">
            Progress:{" "}
            <span className="font-semibold">
              {stats.answered}/{questions.length} answered
            </span>
          </p>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-white text-slate-900 font-semibold px-5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit Quiz
          </button>
        </footer>
      )}

      {/* ⚠️ Fullscreen Exit Warning Popup */}
      {showWarningPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm w-full space-y-4">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
            <h2 className="text-lg font-semibold text-slate-900">
              You exited fullscreen
            </h2>
            <p className="text-sm text-slate-600">
              Please click OK to re-enter fullscreen and continue the quiz.
            </p>
            <p className="text-xs text-red-500 font-medium">
              Warning {warningCount}/3
            </p>

            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={reEnterFullscreen}
                className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200"
              >
                OK
              </button>
              <button
                onClick={() => {
                  document.exitFullscreen();
                  setShowWarningPopup(false);
                  setStarted(false);
                  setWarningCount(0);
                }}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
