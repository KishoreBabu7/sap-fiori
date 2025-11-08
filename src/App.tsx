import { useState, useEffect, useMemo } from "react";
import { QuizQuestion } from "./components/QuizQuestion";
import { QuestionNavigation } from "./components/QuestionNavigation";
import { questions as originalQuestions } from "./data/questions";
import { shuffleArray } from "./utils/shuffle";
import { supabase } from "./lib/supabase";
import { RefreshCw, Send, AlertTriangle, BarChart3 } from "lucide-react";

function App() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Map<number, string[]>>(new Map());
  const [showAnswers, setShowAnswers] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showEmptyPopup, setShowEmptyPopup] = useState(false);
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
    const percentage = questions.length
      ? Math.round((correct / questions.length) * 100)
      : 0;
    return { answered, correct, incorrect, percentage };
  }, [answers, correctAnswers, questions]);

  // 🔒 Fullscreen handling
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

  const submitQuiz = async () => {
    setShowSubmitPopup(false);
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

  const handleSubmitClick = () => {
    if (answers.size === 0) {
      setShowEmptyPopup(true);
      return;
    }
    setShowSubmitPopup(true);
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

  // 🟢 Start Page
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
                    onClick={handleSubmitClick}
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

          {/* ✅ Show Progress Report after Submission */}
          {showAnswers && (
            <div className="w-full bg-white rounded-xl shadow-xl p-8 text-center space-y-4 border-t-4 border-slate-900 animate-fade-in">
              <div className="flex justify-center">
                <BarChart3 className="w-10 h-10 text-slate-900" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Quiz Progress Report
              </h2>
              <p className="text-slate-600">Here’s your performance summary:</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-slate-500">Attempted</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.answered}
                  </p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-green-700">Correct</p>
                  <p className="text-2xl font-bold text-green-700">
                    {stats.correct}
                  </p>
                </div>
                <div className="bg-red-100 rounded-lg p-4">
                  <p className="text-red-700">Wrong</p>
                  <p className="text-2xl font-bold text-red-700">
                    {stats.incorrect}
                  </p>
                </div>
                <div className="bg-amber-100 rounded-lg p-4">
                  <p className="text-amber-700">Score %</p>
                  <p className="text-2xl font-bold text-amber-700">
                    {stats.percentage}%
                  </p>
                </div>
              </div>

              {stats.percentage >= 80 ? (
                <p className="text-green-700 font-semibold mt-4 text-lg">
                  🎉 Excellent! You scored above 80%.
                </p>
              ) : (
                <button
                  onClick={handleReset}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg"
                >
                  Practice Again
                </button>
              )}
            </div>
          )}

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

      {/* ⚠️ Fullscreen Exit Warning */}
      {showWarningPopup && (
        <Popup
          title="You exited fullscreen"
          description="Please click OK to re-enter fullscreen and continue the quiz."
          extra={`Warning ${warningCount}/3`}
          onConfirm={reEnterFullscreen}
          onCancel={() => {
            document.exitFullscreen();
            setShowWarningPopup(false);
            setStarted(false);
            setWarningCount(0);
          }}
          confirmText="OK"
          cancelText="Exit Quiz"
        />
      )}

      {/* 🧾 Submit Confirmation */}
      {showSubmitPopup && (
        <Popup
          title="Submit Quiz?"
          description={`You have answered ${answers.size} of ${questions.length} questions. Do you want to submit now?`}
          onConfirm={submitQuiz}
          onCancel={() => setShowSubmitPopup(false)}
          confirmText="Submit"
          cancelText="Cancel"
        />
      )}

      {/* ❗ Empty Submission Popup */}
      {showEmptyPopup && (
        <Popup
          title="No Answers Found"
          description="Please answer at least one question before submitting."
          onConfirm={() => setShowEmptyPopup(false)}
          confirmText="OK"
        />
      )}
    </div>
  );
}

// 🧩 Reusable Popup Component
function Popup({ title, description, onConfirm, onCancel, confirmText, cancelText, extra }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm w-full space-y-4">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
        {extra && <p className="text-xs text-red-500 font-medium">{extra}</p>}

        <div className="flex justify-center gap-4 mt-3">
          {cancelText && (
            <button
              onClick={onCancel}
              className="bg-slate-200 text-slate-800 px-5 py-2 rounded-lg hover:bg-slate-300 transition-colors duration-200"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
