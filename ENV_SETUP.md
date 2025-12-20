# Environment Setup Guide

## Quick Fix for "supabaseUrl is required" Error

This error occurs because the Supabase environment variables are not configured.

## Steps to Fix:

1. **Create `.env.local` file** in the root directory of your project (`D:\qpproject\.env.local`)

2. **Add the following content** to the file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Get your Supabase credentials:**
   - Go to https://app.supabase.com
   - Select your project (or create a new one)
   - Go to **Settings** → **API**
   - Copy the following:
     - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Replace the placeholder values** in `.env.local` with your actual credentials

5. **Restart your development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

## Example `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
```

⚠️ **Important:** 
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your keys secure and private
- The `NEXT_PUBLIC_` prefix is required for Next.js to expose these variables to the browser

## After Setup:

1. Run the database schema: Go to Supabase SQL Editor and run `SUPABASE_SCHEMA.sql`
2. Start adding questions through the `/questions/add` page
3. Generate question papers from the `/generate` page

