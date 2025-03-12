import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const sampleData = [
  {
    page: 'workshops',
    content: {
      workshops: [
        {
          week: 1,
          links: [
            'https://docs.google.com/presentation/d/1fTN4kQ1w2QSys2OhXuQMKjTmjTFaV3LcRex5Ty7Jd9w/edit#slide=id.p',
            'https://docs.google.com/presentation/d/1LVpdKc5BLzVz2zckPsclxBmTXIBnVW29Jf2V9ryEL-M/edit#slide=id.p'
          ]
        }
      ]
    }
  },
  {
    page: 'challenges',
    content: {
      challenges: [
        {
          week: 1,
          problems: [
            'https://dmoj.ca/problem/ccc15j1',
            'https://dmoj.ca/problem/ccc15j2'
          ]
        }
      ]
    }
  }
];

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    // Insert sample data
    for (const item of sampleData) {
      const { error } = await supabase
        .from('club_content')
        .insert([item]);

      if (error) {
        throw error;
      }
      console.log(`Successfully inserted ${item.page} data`);
    }

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 