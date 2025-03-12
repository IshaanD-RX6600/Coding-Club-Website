# CHCI Coding Club Website

A modern, customizable, and mobile-friendly website for the CHCI Coding Club, built with Next.js, Tailwind CSS, and Supabase.

## Features

- 🎨 Modern UI with dark/light mode
- 📱 Fully responsive design
- 🔒 Supabase backend with Row Level Security
- 🚀 Easy deployment with Vercel
- 📝 Dynamic content management
- 💬 Discord integration
- 📧 Email functionality

## Pages

1. **Home**
   - Club description
   - Club executives
   - Discord link

2. **Workshops**
   - Weekly workshop materials
   - Google Slides presentations

3. **Challenges**
   - Weekly DMOJ problems
   - Iterated Prisoner's Dilemma tournament

4. **Contact**
   - Discord community link

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd coding-club-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Supabase project:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Copy the project URL and anon key

4. Configure environment variables:
   Create a `.env.local` file with the following variables:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=           # Your Supabase project URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=      # Your Supabase anonymous key
   SUPABASE_URL=                       # Same as NEXT_PUBLIC_SUPABASE_URL
   SUPABASE_ANON_KEY=                  # Same as NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY=          # Your Supabase service role key
   SUPABASE_JWT_SECRET=                # Your Supabase JWT secret

   # PostgreSQL Database Configuration
   POSTGRES_HOST=                      # Your PostgreSQL host
   POSTGRES_USER=                      # Your PostgreSQL username
   POSTGRES_PASSWORD=                  # Your PostgreSQL password
   POSTGRES_DATABASE=                  # Your PostgreSQL database name
   POSTGRES_URL=                      # Your PostgreSQL connection URL
   POSTGRES_URL_NON_POOLING=         # Your PostgreSQL non-pooling connection URL
   POSTGRES_PRISMA_URL=              # Your PostgreSQL Prisma connection URL

   # Email Configuration
   EMAIL_HOST=                       # SMTP server host (e.g., smtp.gmail.com)
   EMAIL_PORT=                       # SMTP server port (e.g., 587)
   EMAIL_SECURE=                     # Use TLS (true/false)
   EMAIL_USER=                       # SMTP username
   EMAIL_PASS=                       # SMTP password
   EMAIL_FROM=                       # Sender email address
   ```

5. Set up the database:
   - Run the following SQL in your Supabase SQL editor:
   ```sql
   CREATE TABLE programming_club (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     page TEXT NOT NULL,
     content JSONB NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   ALTER TABLE programming_club ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Public Read Access"
     ON programming_club
     FOR SELECT
     USING (true);
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Push your code to GitHub

2. Deploy to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add all environment variables from `.env.local`
   - Deploy!

## Content Management

Update content through Supabase:

1. **Workshops**
   ```json
   {
     "page": "workshops",
     "content": {
       "workshops": [
         {
           "week": 1,
           "links": [
             "https://docs.google.com/presentation/..."
           ]
         }
       ]
     }
   }
   ```

2. **Challenges**
   ```json
   {
     "page": "challenges",
     "content": {
       "challenges": [
         {
           "week": 1,
           "problems": [
             "https://dmoj.ca/problem/..."
           ]
         }
       ]
     }
   }
   ```

## Environment Variables

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key (public)
- `SUPABASE_URL`: Same as NEXT_PUBLIC_SUPABASE_URL
- `SUPABASE_ANON_KEY`: Same as NEXT_PUBLIC_SUPABASE_ANON_KEY
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations
- `SUPABASE_JWT_SECRET`: JWT secret for authentication

### PostgreSQL Configuration
- `POSTGRES_HOST`: Database host address
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DATABASE`: Database name
- `POSTGRES_URL`: Main connection URL
- `POSTGRES_URL_NON_POOLING`: Connection URL without connection pooling
- `POSTGRES_PRISMA_URL`: URL for Prisma ORM connection

### Email Configuration
- `EMAIL_HOST`: SMTP server host
- `EMAIL_PORT`: SMTP server port
- `EMAIL_SECURE`: Whether to use TLS (true/false)
- `EMAIL_USER`: SMTP username
- `EMAIL_PASS`: SMTP password
- `EMAIL_FROM`: Sender email address

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT
