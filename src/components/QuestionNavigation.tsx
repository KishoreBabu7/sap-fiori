import { Question } from '../data/questions';

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
  correctAnswers
}: QuestionNavigationProps) {
  const scrollToQuestion = (questionId: number) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Question Navigation</h2>
      <div className="grid grid-cols-10 gap-2">
        {questions.map((question, index) => {
          const isAnswered = answers.has(question.id);
          const isCorrect = showAnswers && correctAnswers.has(question.id);
          const isIncorrect = showAnswers && isAnswered && !isCorrect;

          return (
            <button
              key={question.id}
              onClick={() => scrollToQuestion(question.id)}
              className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all ${
                showAnswers
                  ? isCorrect
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : isIncorrect
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  : isAnswered
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
              title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
