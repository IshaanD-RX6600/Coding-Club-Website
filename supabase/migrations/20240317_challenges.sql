-- Create enum types for platforms and difficulties
CREATE TYPE challenge_platform AS ENUM (
  'dmoj',
  'leetcode',
  'hackerrank',
  'tournament',
  'hackathon',
  'competition',
  'other'
);

CREATE TYPE challenge_difficulty AS ENUM (
  'beginner',
  'medium',
  'advanced',
  'na'
);

-- Create challenges table
CREATE TABLE challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  platform challenge_platform NOT NULL,
  difficulty challenge_difficulty NOT NULL,
  url TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hackathons table
CREATE TABLE hackathons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  url TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create competitions table
CREATE TABLE competitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  platform TEXT NOT NULL,
  date DATE NOT NULL,
  registration_deadline DATE NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hackathons_updated_at
  BEFORE UPDATE ON hackathons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitions_updated_at
  BEFORE UPDATE ON competitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

-- Create policies for challenges
CREATE POLICY "Challenges are viewable by everyone"
  ON challenges FOR SELECT
  USING (true);

CREATE POLICY "Challenges are insertable by authenticated users"
  ON challenges FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Challenges are updatable by authenticated users"
  ON challenges FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Challenges are deletable by authenticated users"
  ON challenges FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create policies for hackathons
CREATE POLICY "Hackathons are viewable by everyone"
  ON hackathons FOR SELECT
  USING (true);

CREATE POLICY "Hackathons are insertable by authenticated users"
  ON hackathons FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Hackathons are updatable by authenticated users"
  ON hackathons FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Hackathons are deletable by authenticated users"
  ON hackathons FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create policies for competitions
CREATE POLICY "Competitions are viewable by everyone"
  ON competitions FOR SELECT
  USING (true);

CREATE POLICY "Competitions are insertable by authenticated users"
  ON competitions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Competitions are updatable by authenticated users"
  ON competitions FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Competitions are deletable by authenticated users"
  ON competitions FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert initial data for challenges
INSERT INTO challenges (title, description, platform, difficulty, url, week_number, is_active)
VALUES
  ('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.', 'leetcode', 'beginner', 'https://leetcode.com/problems/two-sum/', 1, true),
  ('Valid Parentheses', 'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.', 'leetcode', 'medium', 'https://leetcode.com/problems/valid-parentheses/', 1, true),
  ('Binary Tree Level Order Traversal', 'Given the root of a binary tree, return the level order traversal of its nodes'' values.', 'leetcode', 'medium', 'https://leetcode.com/problems/binary-tree-level-order-traversal/', 2, true),
  ('Merge K Sorted Lists', 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.', 'leetcode', 'advanced', 'https://leetcode.com/problems/merge-k-sorted-lists/', 2, true),
  ('Prisoner''s Dilemma', 'Implement a solution to the classic prisoner''s dilemma problem.', 'tournament', 'medium', 'https://example.com/prisoners-dilemma', 3, true);

-- Insert DMOJ problems
INSERT INTO challenges (title, description, platform, difficulty, url, week_number, is_active)
VALUES
  -- Week 1
  ('ISBN', 'ISBN validation problem from CCC', 'dmoj', 'beginner', 'https://dmoj.ca/problem/ccc09j1', 1, true),
  ('Pi-day', 'Pi-day celebration problem from CCC', 'dmoj', 'medium', 'https://dmoj.ca/problem/ccc15j5', 1, true),
  ('Alice Through the Looking Glass', 'Alice in Wonderland themed problem from CCC', 'dmoj', 'advanced', 'https://dmoj.ca/problem/ccc11s3', 1, true),
  
  -- Week 2
  ('Terms of Office', 'Political office terms calculation problem from CCC', 'dmoj', 'beginner', 'https://dmoj.ca/problem/ccc04j2', 2, true),
  ('Knight Hop', 'Chess knight movement problem from CCC', 'dmoj', 'medium', 'https://dmoj.ca/problem/ccc10j5', 2, true),
  ('Gates', 'Logic gates problem from CCC', 'dmoj', 'advanced', 'https://dmoj.ca/problem/ccc15s3', 2, true),
  
  -- Week 3
  ('Mod Inverse', 'Modular arithmetic problem from CCC', 'dmoj', 'beginner', 'https://dmoj.ca/problem/ccc01j2', 3, true),
  ('English or French', 'Language detection problem from CCC', 'dmoj', 'medium', 'https://dmoj.ca/problem/ccc11s1', 3, true),
  ('Phonomenal Reviews', 'Graph traversal problem from CCC', 'dmoj', 'advanced', 'https://dmoj.ca/problem/ccc16s3', 3, true),
  
  -- Week 4
  ('Weather Balloon', 'Weather data analysis problem from CCC', 'dmoj', 'beginner', 'https://dmoj.ca/problem/ccc11j2', 4, true),
  ('Choose Your Own Adventure', 'Text adventure problem from CCC', 'dmoj', 'medium', 'https://dmoj.ca/problem/ccc18j5', 4, true),
  ('Waterpark', 'Graph path counting problem from CCC', 'dmoj', 'advanced', 'https://dmoj.ca/problem/ccc07s4', 4, true),
  
  -- Week 5
  ('Punchy', 'Simple calculator problem from CCC', 'dmoj', 'beginner', 'https://dmoj.ca/problem/ccc10j3', 5, true),
  ('From Prefix to Postfix', 'Expression conversion problem from CCC', 'dmoj', 'medium', 'https://dmoj.ca/problem/ccc08j4', 5, true),
  ('Arithmetic Square', 'Grid arithmetic problem from CCC', 'dmoj', 'advanced', 'https://dmoj.ca/problem/ccc19s3', 5, true);

-- Insert initial data for hackathons
INSERT INTO hackathons (title, description, location, start_date, end_date, url, image_url, is_active)
VALUES
  ('UofT Hacks 2024', 'University of Toronto''s annual hackathon', 'Toronto, ON', '2024-02-16', '2024-02-18', 'https://hacks.utoronto.ca', 'https://hacks.utoronto.ca/static/images/logo.png', true),
  ('Hack the North 2024', 'Canada''s biggest hackathon', 'Waterloo, ON', '2024-09-13', '2024-09-15', 'https://hackthenorth.com', 'https://hackthenorth.com/static/images/logo.png', true),
  ('Calgary Hacks 2024', 'Calgary''s premier hackathon', 'Calgary, AB', '2024-03-15', '2024-03-17', 'https://calgaryhacks.com', 'https://calgaryhacks.com/static/images/logo.png', true);

-- Insert initial data for competitions
INSERT INTO competitions (title, description, platform, date, registration_deadline, url, is_active)
VALUES
  ('Google Code Jam 2024', 'Google''s annual coding competition', 'Google', '2024-04-13', '2024-04-01', 'https://codingcompetitions.withgoogle.com/codejam', true),
  ('Facebook Hacker Cup 2024', 'Facebook''s annual programming competition', 'Facebook', '2024-06-15', '2024-06-01', 'https://www.facebook.com/hackercup', true),
  ('Canadian Computing Competition 2024', 'Canada''s premier high school programming competition', 'Waterloo', '2024-02-15', '2024-02-01', 'https://cemc.uwaterloo.ca/contests/computing.html', true);

-- Create indexes for better query performance
CREATE INDEX idx_challenges_week_number ON challenges(week_number);
CREATE INDEX idx_challenges_platform ON challenges(platform);
CREATE INDEX idx_challenges_difficulty ON challenges(difficulty);
CREATE INDEX idx_hackathons_start_date ON hackathons(start_date);
CREATE INDEX idx_hackathons_end_date ON hackathons(end_date);
CREATE INDEX idx_competitions_date ON competitions(date);
CREATE INDEX idx_competitions_registration_deadline ON competitions(registration_deadline);

-- Create function to get active challenges by week
CREATE OR REPLACE FUNCTION get_active_challenges_by_week(week_num INTEGER)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  platform challenge_platform,
  difficulty challenge_difficulty,
  url TEXT,
  week_number INTEGER,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM challenges
  WHERE week_number = week_num AND is_active = true
  ORDER BY difficulty;
END;
$$ LANGUAGE plpgsql;

-- Create function to get upcoming hackathons
CREATE OR REPLACE FUNCTION get_upcoming_hackathons()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  url TEXT,
  image_url TEXT,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM hackathons
  WHERE start_date >= CURRENT_DATE AND is_active = true
  ORDER BY start_date;
END;
$$ LANGUAGE plpgsql;

-- Create function to get upcoming competitions
CREATE OR REPLACE FUNCTION get_upcoming_competitions()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  platform TEXT,
  date DATE,
  registration_deadline DATE,
  url TEXT,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM competitions
  WHERE date >= CURRENT_DATE AND is_active = true
  ORDER BY date;
END;
$$ LANGUAGE plpgsql; 