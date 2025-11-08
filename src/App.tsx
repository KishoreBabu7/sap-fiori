import { useState, useEffect, useMemo } from 'react';
import { FullscreenWarning } from './components/FullscreenWarning';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizProgress } from './components/QuizProgress';
import { QuestionNavigation } from './components/QuestionNavigation';
import { questions as originalQuestions } from './data/questions';
import { shuffleArray } from './utils/shuffle';
import { supabase } from './lib/supabase';
import { RefreshCw, Send } from 'lucide-react';

function App() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Map<number, string[]>>(new Map());
  const [showAnswers, setShowAnswers] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const questions = useMemo(() => {
    return shuffleArray(
      originalQuestions.map(q => ({
        ...q,
        options: shuffleArray(q.options)
      }))
    );
  }, []);

  const correctAnswers = useMemo(() => {
    const correct = new Set<number>();
    questions.forEach(q => {
      const userAnswers = answers.get(q.id) || [];
      if (
        userAnswers.length === q.correctAnswers.length &&
        userAnswers.every(ans => q.correctAnswers.includes(ans))
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

  const handleOptionToggle = (questionId: number, option: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    setAnswers(prev => {
      const newAnswers = new Map(prev);
      const current = newAnswers.get(questionId) || [];

      if (question.correctAnswers.length === 1) {
        newAnswers.set(questionId, [option]);
      } else {
        if (current.includes(option)) {
          const filtered = current.filter(o => o !== option);
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
      alert('Please answer at least one question before submitting.');
      return;
    }

    const confirmSubmit = window.confirm(
      `You have answered ${answers.size} out of ${questions.length} questions. Do you want to submit?`
    );

    if (!confirmSubmit) return;

    setShowAnswers(true);

    try {
      const { data: attemptData, error: attemptError } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: userId,
          score: stats.correct,
          total_questions: questions.length,
        })
        .select()
        .maybeSingle();

      if (attemptError) {
        console.error('Error saving attempt:', attemptError);
        return;
      }

      if (attemptData) {
        const responses = Array.from(answers.entries()).map(([questionId, selectedOptions]) => ({
          attempt_id: attemptData.id,
          question_number: questionId,
          selected_options: selectedOptions,
          is_correct: correctAnswers.has(questionId),
        }));

        const { error: responsesError } = await supabase
          .from('question_responses')
          .insert(responses);

        if (responsesError) {
          console.error('Error saving responses:', responsesError);
        }
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to restart the quiz? All your answers will be lost.'
    );
    if (confirmReset) {
      window.location.reload();
    }
  };

  if (!started) {
    return <FullscreenWarning onContinue={() => setStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            SAP Fiori Application Developer Certification
          </h1>
          <p className="text-lg text-slate-600">Exam Code: C_FIORD_2502</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
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

            <div className="space-y-6">
              {questions.map((question, index) => (
                <QuizQuestion
                  key={question.id}
                  question={question}
                  questionIndex={index + 1}
                  selectedOptions={answers.get(question.id) || []}
                  onOptionToggle={(option) => handleOptionToggle(question.id, option)}
                  showAnswers={showAnswers}
                />
              ))}
            </div>

            {!showAnswers && (
              <div className="sticky bottom-4 bg-white rounded-lg shadow-2xl p-4 border-2 border-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">
                      Answered: <span className="font-bold text-slate-900">{stats.answered}/{questions.length}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Submit Quiz
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <QuizProgress
              total={questions.length}
              answered={stats.answered}
              correct={stats.correct}
              incorrect={stats.incorrect}
              showAnswers={showAnswers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
