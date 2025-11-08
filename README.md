# SAP Fiori Certification Quiz Application

A comprehensive quiz application for SAP Certified Associate - SAP Fiori Application Developer (Exam Code: C_FIORD_2502) with 61 questions.

## Features

### Core Functionality
- **61 Questions**: Complete set of SAP Fiori certification exam questions
- **Randomization**: Questions and options are shuffled on every page refresh
- **Single Page Layout**: All questions displayed on one page for easy navigation
- **Flexible Answering**: Answer questions in any order you prefer
- **Question Navigation**: Grid-based navigation to jump to any question
- **Progress Tracking**: Real-time tracking of answered/unanswered questions
- **Answer Validation**: Automatic checking with correct answers displayed after submission

### User Experience
- **Fullscreen Mode**: Quiz starts in fullscreen to minimize distractions
- **Warning System**: 3 warnings for exiting fullscreen or switching tabs
- **Interactive Options**: Click to select/deselect options (single or multiple choice)
- **Visual Feedback**: Color-coded results (green for correct, red for incorrect)
- **Score Summary**: Complete breakdown of correct, incorrect, and unanswered questions
- **Percentage Score**: Overall performance percentage displayed after submission

### Design
- **Modern UI**: Clean, professional design with smooth animations
- **Responsive Layout**: Works on all device sizes
- **Accessible**: High contrast ratios and clear visual hierarchy
- **Intuitive Navigation**: Easy-to-use question grid navigation
- **Progress Sidebar**: Sticky sidebar showing quiz statistics

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- A Supabase account (free tier works)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Supabase**:
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from Project Settings > API
   - Update the `.env` file:
     ```
     VITE_SUPABASE_URL=your_supabase_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Deploy**:
   - The `dist` folder contains the production build
   - Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## How to Use

1. **Start Quiz**: Click "Start Quiz in Fullscreen" on the welcome screen
2. **Answer Questions**: Click on options to select your answers
   - Single-choice questions: Clicking a new option deselects the previous one
   - Multiple-choice questions: Click to toggle each option
3. **Navigate**: Use the question grid at the top to jump to specific questions
4. **Track Progress**: Monitor your progress in the sidebar
5. **Submit**: Click "Submit Quiz" when ready
6. **Review Results**: See your score and correct answers for all questions
7. **Retry**: Click "Reset" to start a fresh attempt

## Database Schema

The application uses Supabase with two tables:

### quiz_attempts
- Stores each quiz attempt with user ID, score, and timestamp
- Tracks overall performance

### question_responses
- Stores individual question responses
- Links to quiz attempts
- Records selected options and correctness

## Features Breakdown

### Randomization
- Questions are shuffled on every page load
- Options within each question are randomized
- Ensures practice sessions feel fresh each time

### Warning System
- Monitors fullscreen status and tab visibility
- Issues warnings (up to 3) when users exit fullscreen
- After 3 warnings, allows continuing without fullscreen

### Progress Tracking
- Shows answered vs total questions
- Displays correct/incorrect/unanswered after submission
- Calculates overall percentage score
- Provides performance feedback

### Answer Feedback
- Correct answers highlighted in green
- Incorrect answers highlighted in red
- Shows correct answer when user is wrong
- Visual indicators (checkmarks and X marks)

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Deployment**: Static hosting ready

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fullscreen API support recommended
- JavaScript enabled required

## Security

- Row Level Security (RLS) enabled on all tables
- Anonymous quiz attempts allowed
- No sensitive data stored
- Client-side validation

## License

Educational use only. Questions are for SAP Fiori certification preparation.

## Support

For issues or questions, please check the SAP Learning Hub or official SAP certification resources.
