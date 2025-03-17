-- First, ensure the workshops table exists with the correct structure
CREATE TABLE IF NOT EXISTS workshops (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    week_number INTEGER NOT NULL,
    date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create workshop_materials table if it doesn't exist
CREATE TABLE IF NOT EXISTS workshop_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('slides', 'code', 'video', 'document', 'other')),
    url TEXT NOT NULL,
    order_position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert workshops data
INSERT INTO workshops (title, description, week_number, date) VALUES
('Introduction to Programming', NULL, 1, '2024-01-01'),
('Variables and Data Types', NULL, 2, '2024-01-08'),
('Control Flow', NULL, 3, '2024-01-15'),
('Functions and Methods', NULL, 4, '2024-01-22'),
('Arrays and Lists', NULL, 5, '2024-01-29'),
('Object-Oriented Programming', NULL, 6, '2024-02-05'),
('Algorithms Basics', NULL, 7, '2024-02-12'),
('Sorting Algorithms', NULL, 8, '2024-02-19'),
('Data Structures', NULL, 9, '2024-02-26'),
('Advanced Data Structures', NULL, 10, '2024-03-04'),
('Problem Solving Strategies', NULL, 11, '2024-03-11'),
('Prisoner''s Dilemma Tournament', 'Create a C++ function for the Iterated Prisoner''s Dilemma tournament with the structure:\n\nint functionName(int lastMove, int roundNumber, vector<int> P1LastMoves, vector<int> P2LastMoves) {\n    // your code here\n    return 0; // zero represents staying quiet, and 1 represents speaking up.\n}\n\nlastMove is the opponent''s last move (2 if first round), roundNumber is the current round (starting at 1). Optional P1LastMoves and P2LastMoves vectors contain full history of moves. Your strategy will compete against others in a tournament format.', 12, '2024-03-18'),
('Dynamic Programming', NULL, 13, '2024-03-25'),
('Graph Theory', NULL, 14, '2024-04-01'),
('Advanced Algorithms', NULL, 15, '2024-04-08'),
('Competitive Programming', NULL, 16, '2024-04-15'),
('Web Development Basics', NULL, 17, '2024-04-22'),
('Frontend Development', NULL, 18, '2024-04-29'),
('Final Project Workshop', NULL, 19, '2024-05-06'),
('Project Results', NULL, 20, '2024-05-13');

-- Insert workshop materials (slides)
INSERT INTO workshop_materials (workshop_id, title, type, url, order_position)
SELECT 
    w.id,
    w.title || ' Slides',
    'slides',
    CASE w.week_number
        WHEN 1 THEN 'https://docs.google.com/presentation/d/1fTN4kQ1w2QSys2OhXuQMKjTmjTFaV3LcRex5Ty7Jd9w/edit#slide=id.p'
        WHEN 2 THEN 'https://docs.google.com/presentation/d/1LVpdKc5BLzVz2zckPsclxBmTXIBnVW29Jf2V9ryEL-M/edit#slide=id.p'
        WHEN 3 THEN 'https://docs.google.com/presentation/d/1rp1hmci28iHTQUYlCoXuJdOePbKdu6dHtjdxc_UCE90/edit#slide=id.p'
        WHEN 4 THEN 'https://docs.google.com/presentation/d/1e4Lmfo96eRFtsDAHkCCJtnIW9nPba8Enf94wgSbilXc/edit#slide=id.p'
        WHEN 5 THEN 'https://docs.google.com/presentation/d/1tHLpSPL3_SADNBzL9LI0oSneTG1LyyjzlZsUlpbF-Wo/edit'
        WHEN 6 THEN 'https://docs.google.com/presentation/d/17lZtaKRQSJGb4FVNtxMMe2pEQ3aUYr12YGEW7Ptn9rs/edit#slide=id.p'
        WHEN 7 THEN 'https://docs.google.com/presentation/d/1yEWom2O02Cz2tYim_Dj3ITPC4lEAyokdKBHWIhpRORk/edit#slide=id.p'
        WHEN 8 THEN 'https://docs.google.com/presentation/d/17w2NcIim65-DtHvbxoeFamjPlvMer_pkR3tOAUiz7Uo/edit#slide=id.p'
        WHEN 9 THEN 'https://docs.google.com/presentation/d/1WIiY49gLZWLhl1fz2_UwItWAUVaAulZvFTyGwRojQgY/edit#slide=id.p'
        WHEN 10 THEN 'https://docs.google.com/presentation/d/1BFwSqZMN_Eh0CKrphMT2yvaie-d-TMIPdd2TJnYlt_8/edit#slide=id.p'
        WHEN 11 THEN 'https://docs.google.com/presentation/d/1sQy20FHJ7l5vOROKPA4d78yg6XWROz_27DpESkBLhVY/edit#slide=id.p'
        WHEN 13 THEN 'https://docs.google.com/presentation/d/1ENdAr43sDuiaTIAD9ldETmMeqf1pWdHA0ovsLjV99X0/edit#slide=id.p'
        WHEN 14 THEN 'https://docs.google.com/presentation/d/1W1ugq9rMZDygLA3h2dudjJSCCt213IvEcm7zb298wCY/edit#slide=id.p'
        WHEN 15 THEN 'https://docs.google.com/presentation/d/1MvgmvSD9RdgHVyDI5vkzAwbxthsbjyR57pNjbgD9L1o/edit#slide=id.p'
        WHEN 16 THEN 'https://docs.google.com/presentation/d/1jTgiFg8xHZaJWPNXMt635aay1lgFU9vaS_zzPtuKOzc/edit#slide=id.p'
        WHEN 17 THEN 'https://docs.google.com/presentation/d/1Spvq7fYFXlAwBJMTOJQwHI7Zn9apoTeSU2EQAlu7cQU/edit#slide=id.g754534f808_1_198'
        WHEN 18 THEN 'https://docs.google.com/presentation/d/1E2d9VXqYHrcB964f7AfGx8yLDb3tI5dgOexdMrYsENk/edit#slide=id.p'
        WHEN 19 THEN 'https://docs.google.com/presentation/d/1vaiM8JNKL7-rr4AOJPcL5zlC79FRqdnAEl1lON637us/edit#slide=id.p'
        WHEN 20 THEN 'https://drive.google.com/file/d/1-hc7JKZjjedjGljIDribEKp2uY0BKAZ0/view'
    END,
    1
FROM workshops w
WHERE w.week_number IN (1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20); 