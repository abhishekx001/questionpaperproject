-- Run this in your Supabase SQL Editor to add the Part B Preference column
ALTER TABLE questions ADD COLUMN IF NOT EXISTS part_b_type text DEFAULT 'any';

-- Update the existing questions to have 'any' if strictly needed (though default handles it)
UPDATE questions SET part_b_type = 'any' WHERE part_b_type IS NULL;
