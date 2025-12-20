-- Supabase Database Schema for Question Paper Generator
-- Run this SQL in your Supabase SQL Editor

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  marks INTEGER NOT NULL,
  subject TEXT NOT NULL,
  unit TEXT,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on marks for faster queries
CREATE INDEX IF NOT EXISTS idx_questions_marks ON questions(marks);

-- Create index on subject for faster queries
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject);

-- Create index on subject and marks combination for filtering
CREATE INDEX IF NOT EXISTS idx_questions_subject_marks ON questions(subject, marks);

-- Enable Row Level Security (RLS)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since we removed authentication)
-- For public access, allow SELECT, INSERT, UPDATE, DELETE for all
CREATE POLICY "Allow all operations for questions" ON questions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: If you want to restrict to authenticated users only, use this instead:
-- CREATE POLICY "Allow authenticated users" ON questions
--   FOR ALL
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create paper_structure table (for future use)
CREATE TABLE IF NOT EXISTS paper_structure (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  questions_count INTEGER NOT NULL,
  marks_each INTEGER NOT NULL,
  total_marks INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for paper_structure
ALTER TABLE paper_structure ENABLE ROW LEVEL SECURITY;

-- Create policy for paper_structure
CREATE POLICY "Allow all operations for paper_structure" ON paper_structure
  FOR ALL
  USING (true)
  WITH CHECK (true);

