import { Question } from '../data/questions';
import { Check, X } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  selectedOptions: string[];
  onOptionToggle: (option: string) => void;
  showAnswers: boolean;
}

export function QuizQuestion({
  question,
  questionIndex,
  selectedOptions,
  onOptionToggle,
  showAnswers
}: QuizQuestionProps) {
  const isCorrect = showAnswers &&
    selectedOptions.length === question.correctAnswers.length &&
    selectedOptions.every(opt => question.correctAnswers.includes(opt));

  const isIncorrect = showAnswers && !isCorrect && selectedOptions.length > 0;

  return (
    <div
      id={`question-${question.id}`}
      className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all ${
        showAnswers
          ? isCorrect
            ? 'border-green-500 bg-green-50'
            : isIncorrect
            ? 'border-red-500 bg-red-50'
            : 'border-slate-200'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
          showAnswers
            ? isCorrect
              ? 'bg-green-500 text-white'
              : isIncorrect
              ? 'bg-red-500 text-white'
              : 'bg-slate-200 text-slate-700'
            : selectedOptions.length > 0
            ? 'bg-slate-900 text-white'
            : 'bg-slate-200 text-slate-700'
        }`}>
          {showAnswers && isCorrect && <Check className="w-5 h-5" />}
          {showAnswers && isIncorrect && <X className="w-5 h-5" />}
          {(!showAnswers || (!isCorrect && !isIncorrect)) && questionIndex}
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 leading-relaxed whitespace-pre-wrap">
              {question.question}
            </h3>
            {question.note && (
              <p className="text-sm text-slate-600 mt-2 italic">{question.note}</p>
            )}
          </div>

          <div className="space-y-2">
            {question.options.map((option, idx) => {
              const isSelected = selectedOptions.includes(option);
              const isCorrectAnswer = question.correctAnswers.includes(option);
              const showCorrect = showAnswers && isCorrectAnswer;
              const showIncorrect = showAnswers && isSelected && !isCorrectAnswer;

              return (
                <button
                  key={idx}
                  onClick={() => !showAnswers && onOptionToggle(option)}
                  disabled={showAnswers}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showAnswers
                      ? showCorrect
                        ? 'border-green-500 bg-green-100 cursor-not-allowed'
                        : showIncorrect
                        ? 'border-red-500 bg-red-100 cursor-not-allowed'
                        : 'border-slate-200 bg-slate-50 cursor-not-allowed'
                      : isSelected
                      ? 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
                      : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                      showAnswers
                        ? showCorrect
                          ? 'border-green-600 bg-green-500'
                          : showIncorrect
                          ? 'border-red-600 bg-red-500'
                          : 'border-slate-300 bg-white'
                        : isSelected
                        ? 'border-white bg-white'
                        : 'border-slate-400 bg-white'
                    }`}>
                      {((showAnswers && showCorrect) || (!showAnswers && isSelected)) && (
                        <Check className={`w-3 h-3 ${showAnswers ? 'text-white' : 'text-slate-900'}`} />
                      )}
                      {showAnswers && showIncorrect && (
                        <X className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={`flex-1 ${
                      showAnswers && !showCorrect && !showIncorrect
                        ? 'text-slate-700'
                        : ''
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {showAnswers && isIncorrect && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm font-semibold text-green-800 mb-2">Correct Answer(s):</p>
              <ul className="text-sm text-green-700 space-y-1">
                {question.correctAnswers.map((answer, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
