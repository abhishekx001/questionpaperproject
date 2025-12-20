# 🚨 QUICK FIX: "Failed to fetch" Error

## The Problem
Your `.env.local` file is missing! This file contains your Supabase credentials needed to connect to the database.

## ✅ Solution (3 Steps)

### Step 1: Get Your Supabase Credentials

1. Go to **https://app.supabase.com**
2. **Sign in** or **Create Account** (free)
3. **Create a new project** (or select existing one)
   - Project name: `question-paper-generator` (or any name)
   - Database password: Choose a strong password (save it!)
   - Region: Choose closest to you
   - Wait 2-3 minutes for project to be created

4. Once project is ready:
   - Click on your project
   - Go to **Settings** (gear icon) → **API**
   - You'll see:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public** key (long JWT token starting with `eyJ...`)

### Step 2: Create `.env.local` File

1. In your project folder (`D:\qpproject`), create a new file named `.env.local`
   - **Important:** The file must be named exactly `.env.local` (with the dot at the start)

2. Copy and paste this template into the file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

3. Replace the placeholders:
   - Replace `your_supabase_project_url_here` with your **Project URL** from Step 1
   - Replace `your_supabase_anon_key_here` with your **anon public** key from Step 1

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example_key_here
```

### Step 3: Create Database Table

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Open the file `SUPABASE_SCHEMA.sql` from your project
3. Copy **ALL** the SQL code from that file
4. Paste it into the SQL Editor
5. Click **RUN** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

### Step 4: Restart Your Server

1. **Stop** your current dev server (press `Ctrl+C` in terminal)
2. **Start** it again:
   ```bash
   npm run dev
   ```

### Step 5: Test It!

1. Go to **http://localhost:3000/questions/add**
2. Fill in the form:
   - Question Text: "Define computer network."
   - Marks: 5
   - Subject: "mcn201"
   - Click **Add Question**
3. ✅ It should work now!

---

## ❌ Still Not Working?

### Check These:

1. **File location:** `.env.local` must be in `D:\qpproject\` (same folder as `package.json`)

2. **File name:** Must be exactly `.env.local` (not `env.local` or `.env`)

3. **No quotes:** Don't put quotes around the values:
   ```env
   # ✅ Correct
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   
   # ❌ Wrong
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
   ```

4. **No spaces:** No spaces around the `=` sign:
   ```env
   # ✅ Correct
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   
   # ❌ Wrong
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   ```

5. **Server restarted:** You MUST restart the server after creating `.env.local`

6. **Check browser console:** Press F12 → Console tab → Look for error messages

---

## 📸 Visual Guide

### Where to find Supabase credentials:
```
Supabase Dashboard
  → Your Project
    → Settings (⚙️ icon)
      → API
        → Project URL (copy this)
        → anon public key (copy this)
```

### File structure should be:
```
D:\qpproject\
  ├── .env.local          ← CREATE THIS FILE
  ├── package.json
  ├── app\
  ├── lib\
  └── ...
```

---

## 🆘 Need Help?

If you're still stuck:
1. Check `TROUBLESHOOTING.md` for detailed steps
2. Check browser console (F12) for specific error messages
3. Verify your Supabase project is active (not paused)

