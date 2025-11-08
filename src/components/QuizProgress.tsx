import { CheckCircle, XCircle, Circle } from 'lucide-react';

interface QuizProgressProps {
  total: number;
  answered: number;
  correct: number;
  incorrect: number;
  showAnswers: boolean;
}

export function QuizProgress({ total, answered, correct, incorrect, showAnswers }: QuizProgressProps) {
  const percentage = (answered / total) * 100;
  const correctPercentage = showAnswers ? (correct / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Quiz Progress</h2>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Questions Answered</span>
            <span className="font-semibold">{answered}/{total}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-slate-900 h-full transition-all duration-300 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {showAnswers && (
          <>
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">Correct</span>
                </div>
                <span className="font-bold text-green-600 text-lg">{correct}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-slate-700">Incorrect</span>
                </div>
                <span className="font-bold text-red-600 text-lg">{incorrect}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-700">Unanswered</span>
                </div>
                <span className="font-bold text-slate-600 text-lg">{total - answered}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {correctPercentage.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-600">Overall Score</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mt-4">
              <p className="text-sm text-slate-600 text-center">
                {correctPercentage >= 80
                  ? 'Excellent! You have a strong understanding of SAP Fiori.'
                  : correctPercentage >= 60
                  ? 'Good job! Review the incorrect answers to improve.'
                  : 'Keep studying! Review all questions for better results.'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
