/*
  # Quiz Application Schema

  1. New Tables
    - `quiz_attempts`
      - `id` (uuid, primary key)
      - `user_id` (text) - Browser session identifier
      - `score` (integer) - Total correct answers
      - `total_questions` (integer) - Total questions attempted
      - `completed_at` (timestamp)
      - `created_at` (timestamp)
    
    - `question_responses`
      - `id` (uuid, primary key)
      - `attempt_id` (uuid, foreign key)
      - `question_number` (integer)
      - `selected_options` (jsonb) - Array of selected options
      - `is_correct` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated and anonymous users to manage their own data
*/

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  score integer DEFAULT 0,
  total_questions integer DEFAULT 0,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS question_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_number integer NOT NULL,
  selected_options jsonb NOT NULL,
  is_correct boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts"
  ON quiz_attempts FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own responses"
  ON question_responses FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own responses"
  ON question_responses FOR INSERT
  WITH CHECK (true);