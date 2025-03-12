$envVars = @{
    "POSTGRES_URL" = "postgres://postgres.mlnggkglefhwsghvzvxy:K2OouBbijCdSqfFv@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x"
    "POSTGRES_PRISMA_URL" = "postgres://postgres.mlnggkglefhwsghvzvxy:K2OouBbijCdSqfFv@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x"
    "SUPABASE_URL" = "https://mlnggkglefhwsghvzvxy.supabase.co"
    "NEXT_PUBLIC_SUPABASE_URL" = "https://mlnggkglefhwsghvzvxy.supabase.co"
    "POSTGRES_URL_NON_POOLING" = "postgres://postgres.mlnggkglefhwsghvzvxy:K2OouBbijCdSqfFv@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require"
    "SUPABASE_JWT_SECRET" = "MuACMeA/soIBqFeQuN9DV7V+BdsC7oxneeeq9IJgESAUYH+Cu4ypIyrMVVdosDs0oLmQxbWWSmIg/zO2tF8iOA=="
    "POSTGRES_USER" = "postgres"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbmdna2dsZWZod3NnaHZ6dnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDQwOTksImV4cCI6MjA1NzM4MDA5OX0.vGL62EXYe_NHJ2JO389m4oLXp52_LxaiqHtAWAP9zWU"
    "POSTGRES_PASSWORD" = "K2OouBbijCdSqfFv"
    "POSTGRES_DATABASE" = "postgres"
    "SUPABASE_SERVICE_ROLE_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbmdna2dsZWZod3NnaHZ6dnh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTgwNDA5OSwiZXhwIjoyMDU3MzgwMDk5fQ.sOdaNLHJ9TjduOhlSPdPpjYqCABeQENfj_pMn2HOipQ"
    "POSTGRES_HOST" = "db.mlnggkglefhwsghvzvxy.supabase.co"
}

foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    Write-Host "Adding $key..."
    vercel env add $key production
    $value | vercel env add $key preview
    $value | vercel env add $key development
} 