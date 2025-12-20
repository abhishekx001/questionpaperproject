# Troubleshooting Guide

## "TypeError: Failed to fetch" Error

This error occurs when the app cannot connect to Supabase. Follow these steps to fix it:

### Step 1: Check Supabase Configuration

1. **Verify `.env.local` file exists** in the root directory (`D:\qpproject\.env.local`)

2. **Check the file contents** - it should look like:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Verify your credentials:**
   - Go to https://app.supabase.com
   - Select your project
   - Go to **Settings** → **API**
   - Compare the URL and anon key with your `.env.local` file
   - Make sure there are no extra spaces or quotes

4. **Restart your dev server** after creating/updating `.env.local`:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Step 2: Check Database Table

1. **Verify the `questions` table exists:**
   - Go to Supabase Dashboard → **Table Editor**
   - You should see a `questions` table
   - If not, go to **SQL Editor** and run `SUPABASE_SCHEMA.sql`

2. **Check table structure:**
   The table should have these columns:
   - `id` (uuid)
   - `question_text` (text)
   - `marks` (integer)
   - `subject` (text)
   - `unit` (text, nullable)
   - `difficulty` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

### Step 3: Check Row Level Security (RLS)

1. **Verify RLS policies:**
   - Go to Supabase Dashboard → **Authentication** → **Policies**
   - Or go to **Table Editor** → `questions` table → **Policies**
   - You should have a policy that allows all operations (since we removed auth)

2. **If no policy exists, run this SQL in SQL Editor:**
   ```sql
   CREATE POLICY "Allow all operations for questions" ON questions
     FOR ALL
     USING (true)
     WITH CHECK (true);
   ```

### Step 4: Test Connection

1. **Open browser console** (F12)
2. **Try adding a question** and check the console for detailed error messages
3. **Look for specific error codes:**
   - `PGRST116` = Table doesn't exist
   - `42501` = Permission denied (RLS issue)
   - `Failed to fetch` = Network/connection issue

### Step 5: Common Issues

#### Issue: "Invalid API key"
- **Solution:** Check your `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Make sure you're using the **anon public** key, not the service_role key

#### Issue: "Table does not exist"
- **Solution:** Run `SUPABASE_SCHEMA.sql` in Supabase SQL Editor

#### Issue: "Permission denied"
- **Solution:** Check RLS policies (Step 3 above)

#### Issue: Network error
- **Solution:** 
  - Check internet connection
  - Verify Supabase project is active (not paused)
  - Check if Supabase URL is correct

### Step 6: Verify Setup

After fixing the issues, verify everything works:

1. ✅ `.env.local` file exists with correct credentials
2. ✅ Dev server restarted after creating `.env.local`
3. ✅ `questions` table exists in Supabase
4. ✅ RLS policy allows all operations
5. ✅ Can add questions without errors

### Still Having Issues?

1. **Check browser console** for detailed error messages
2. **Check Supabase logs:**
   - Go to Supabase Dashboard → **Logs** → **API Logs**
   - Look for failed requests
3. **Verify Supabase project status:**
   - Make sure your project is not paused
   - Check if you've exceeded any limits

## Quick Checklist

- [ ] `.env.local` file exists
- [ ] Supabase URL is correct (starts with `https://`)
- [ ] Supabase anon key is correct (long JWT token)
- [ ] Dev server restarted after creating `.env.local`
- [ ] `questions` table exists in Supabase
- [ ] RLS policy allows all operations
- [ ] Internet connection is working
- [ ] Supabase project is active

