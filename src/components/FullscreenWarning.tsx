import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FullscreenWarningProps {
  onContinue: () => void;
}

export function FullscreenWarning({ onContinue }: FullscreenWarningProps) {
  const [warningCount, setWarningCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && warningCount < 3) {
        setWarningCount(prev => prev + 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && warningCount < 3) {
        setWarningCount(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && warningCount < 3) {
        setWarningCount(prev => prev + 1);
      }
    });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [warningCount]);

  const handleContinue = async () => {
    try {
      await document.documentElement.requestFullscreen();
      onContinue();
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
      onContinue();
    }
  };

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
            This quiz will be conducted in fullscreen mode to ensure focus and prevent distractions.
          </p>
        </div>

        {warningCount > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">
                  Warning {warningCount}/3
                </p>
                <p className="text-sm text-red-700 mt-1">
                  You have exited fullscreen mode or switched tabs. After 3 warnings, you will be allowed to continue but your attempt will be noted.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-50 rounded-lg p-6 space-y-3 text-sm text-slate-700">
          <h3 className="font-semibold text-slate-900 text-base mb-3">Quiz Guidelines:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>All 61 questions will be displayed on a single page</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Questions and options are randomized on each refresh</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>You can answer questions in any order</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Correct answers will be shown after submission</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Your progress will be tracked throughout the quiz</span>
            </li>
          </ul>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Start Quiz in Fullscreen
        </button>

        {warningCount >= 3 && (
          <button
            onClick={onContinue}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Continue Without Fullscreen (Not Recommended)
          </button>
        )}
      </div>
    </div>
  );
}
