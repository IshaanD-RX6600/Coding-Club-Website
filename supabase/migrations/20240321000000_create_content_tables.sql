-- Create admins table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create hero_content table
CREATE TABLE hero_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  primary_button_text TEXT NOT NULL,
  primary_button_link TEXT NOT NULL,
  secondary_button_text TEXT NOT NULL,
  secondary_button_link TEXT NOT NULL,
  hero_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create about_section table
CREATE TABLE about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  meeting_location TEXT NOT NULL,
  meeting_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create social_links table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  button_text TEXT NOT NULL,
  button_style TEXT NOT NULL CHECK (button_style IN ('default', 'instagram', 'discord')),
  order_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create executives table
CREATE TABLE executives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  grade INTEGER NOT NULL,
  role TEXT,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  event_type TEXT NOT NULL,
  date DATE NOT NULL,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create featured_projects table
CREATE TABLE featured_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  project_url TEXT NOT NULL,
  github_url TEXT,
  tags TEXT[] NOT NULL,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create workshops table
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  materials JSONB NOT NULL,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create coding_challenges table
CREATE TABLE coding_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  platform TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  url TEXT NOT NULL,
  due_date DATE,
  is_active BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE executives ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE coding_challenges ENABLE ROW LEVEL SECURITY;

-- Admins table policies
CREATE POLICY "Allow public read access to admins" ON admins
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admin insert" ON admins
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow authenticated admin delete" ON admins
  FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admins));

-- Content tables policies (hero, about, social, executives, gallery)
CREATE POLICY "Allow public read access to hero_content" ON hero_content
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to hero_content" ON hero_content
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow public read access to about_section" ON about_section
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to about_section" ON about_section
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow public read access to social_links" ON social_links
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to social_links" ON social_links
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow public read access to executives" ON executives
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to executives" ON executives
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow public read access to gallery_images" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to gallery_images" ON gallery_images
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow public read access to featured_projects" ON featured_projects
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to featured_projects" ON featured_projects
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow public read access to workshops" ON workshops
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to workshops" ON workshops
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Allow public read access to coding_challenges" ON coding_challenges
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all access to coding_challenges" ON coding_challenges
  USING (auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admins));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON hero_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_section_updated_at
  BEFORE UPDATE ON about_section
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON social_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_executives_updated_at
  BEFORE UPDATE ON executives
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_featured_projects_updated_at
  BEFORE UPDATE ON featured_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workshops_updated_at
  BEFORE UPDATE ON workshops
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coding_challenges_updated_at
  BEFORE UPDATE ON coding_challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO hero_content (
  title,
  description,
  primary_button_text,
  primary_button_link,
  secondary_button_text,
  secondary_button_link
) VALUES (
  'Welcome to CHCI Coding Club',
  'Join us to learn programming, solve challenges, and build amazing projects together.',
  'Join the Club',
  'https://discord.gg/hgQWvpYm',
  'Featured Projects',
  '/projects'
);

INSERT INTO about_section (
  title,
  description,
  meeting_location,
  meeting_time
) VALUES (
  'About Our Club',
  'A community of passionate coders learning and building together',
  'Room C137 (Right in front of the Gym)',
  'Every Thursday from 2:30 PM to 4:00 PM'
);

INSERT INTO social_links (
  title,
  description,
  link,
  button_text,
  button_style,
  order_position
) VALUES
  (
    'Join our Google Classroom',
    'Class Code: ABC123',
    'https://classroom.google.com',
    'Open Classroom',
    'default',
    1
  ),
  (
    'Follow us on Instagram',
    '@chci.coding.club',
    'https://instagram.com',
    'Follow Us',
    'instagram',
    2
  ),
  (
    'Join our Discord',
    'Connect with other club members',
    'https://discord.gg/hgQWvpYm',
    'Join Server',
    'discord',
    3
  );

INSERT INTO executives (
  name,
  grade,
  role,
  order_position
) VALUES
  ('Russell Morland', 12, 'Executive', 1),
  ('Raymon Drost', 12, 'Co-President', 2),
  ('Jeevithan Muhunthan', 10, 'Co-President', 3),
  ('Kevin Chang', 10, 'Co-President', 4); 

INSERT INTO gallery_images (
  title,
  description,
  image_url,
  event_type,
  date,
  order_position
) VALUES
  (
    'CHCI Coding Club',
    'A community of passionate coders learning and building together',
    'https://example.com/image.jpg',
    'Workshop',
    '2024-01-01',
    1
  ),
  (
    'CHCI Coding Club',
    'A community of passionate coders learning and building together',
    'https://example.com/image.jpg',
    'Workshop',
    '2024-01-01',
    2
  );

INSERT INTO featured_projects (
  title,
  description,
  image_url,
  project_url,
  github_url,
  tags,
  order_position
) VALUES
  (
    'CHCI Coding Club', 
    'A community of passionate coders learning and building together',
    'https://example.com/image.jpg',
    'https://example.com/project',
    'https://example.com/github',
    '{Python, JavaScript}',
    1
  ),
  (
    'CHCI Coding Club',
    'A community of passionate coders learning and building together',
    'https://example.com/image.jpg',
    'https://example.com/project',
    'https://example.com/github',
    '{Python, JavaScript}',
    2
  );

INSERT INTO workshops (
  title,
  description,
  date,
  materials,
  order_position
) VALUES
  (
    'CHCI Coding Club',
    'A community of passionate coders learning and building together',
    '2024-01-01',
    '{Python, JavaScript}',
    1
  ),
  (   
    'CHCI Coding Club',
    'A community of passionate coders learning and building together',
    '2024-01-01',
    '{Python, JavaScript}',
    2
  );

INSERT INTO coding_challenges (
  title,
  description,
  platform,
  difficulty,
  url,
  due_date,
  is_active,
  order_position
) VALUES
  (
    'CHCI Coding Club',
    'A community of passionate coders learning and building together',
    'DMOJ',
    'Easy',
    'https://example.com/challenge',
    '2024-01-01',
    true,
    1
  ),
  (
    'CHCI Coding Club',
    'A community of passionate coders learning and building together',
    'DMOJ',
    'Easy',
    'https://example.com/challenge',
    '2024-01-01',
    true,
    2
  );        

