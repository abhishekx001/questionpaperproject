# ✅ Next Steps After Setting Up .env.local

Great! You've added your Supabase credentials. Now follow these steps:

## Step 1: Restart Your Development Server ⚠️ IMPORTANT!

The server needs to be restarted to load the new environment variables.

1. **Stop your current server:**
   - Go to your terminal/command prompt
   - Press `Ctrl + C` to stop the server

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Wait for it to start** - you should see:
   ```
   ▲ Next.js 16.x.x
   - Local:        http://localhost:3000
   ```

---

## Step 2: Create the Database Table

You need to create the `questions` table in Supabase.

### Option A: Using SQL Editor (Recommended)

1. **Go to Supabase Dashboard:**
   - Open https://app.supabase.com
   - Click on your project

2. **Open SQL Editor:**
   - In the left sidebar, click **"SQL Editor"** (or "SQL")
   - It's usually near the top of the sidebar

3. **Create a new query:**
   - Click **"New query"** button (top right)

4. **Copy the SQL code:**
   - Open the file `SUPABASE_SCHEMA.sql` from your project folder
   - Select **ALL** the code (Ctrl+A, then Ctrl+C)

5. **Paste and run:**
   - Paste the code into the SQL Editor
   - Click **"RUN"** button (or press Ctrl+Enter)
   - Wait a few seconds

6. **Verify success:**
   - You should see "Success. No rows returned" or similar
   - If you see errors, check the error message

### Option B: Using Table Editor

1. Go to **Table Editor** in Supabase
2. Click **"New table"**
3. Name it `questions`
4. Add these columns manually (not recommended, use SQL instead)

---

## Step 3: Verify the Table Was Created

1. In Supabase Dashboard, go to **Table Editor**
2. You should see a table named **"questions"**
3. Click on it to see the columns:
   - id
   - question_text
   - marks
   - subject
   - unit
   - difficulty
   - created_at
   - updated_at

---

## Step 4: Test Adding a Question! 🎉

1. **Open your app:**
   - Go to http://localhost:3000
   - Navigate to **"Add Questions"** or go to http://localhost:3000/questions/add

2. **Fill in the form:**
   - Question Text: "Define computer network."
   - Marks: 5
   - Subject: "mcn201"
   - Unit: (optional, leave empty)
   - Difficulty: Medium

3. **Click "Add Question"**

4. **Check for success:**
   - ✅ You should see a green success message: "Question added successfully!"
   - ❌ If you see an error, check the error message

---

## Step 5: View Your Questions

1. Click **"View Questions"** button
2. Or go to http://localhost:3000/questions
3. You should see your question listed!

---

## ✅ Checklist

Before testing, make sure:

- [ ] ✅ `.env.local` file has both URL and anon key filled in
- [ ] ✅ Dev server has been **restarted** (this is critical!)
- [ ] ✅ Database table `questions` has been created (run SUPABASE_SCHEMA.sql)
- [ ] ✅ No errors in the browser console (press F12 to check)

---

## 🐛 Troubleshooting

### If you still get "Failed to fetch":

1. **Check server was restarted:**
   - Make sure you stopped (Ctrl+C) and restarted the server
   - Environment variables only load on server start

2. **Check .env.local format:**
   - No quotes around values
   - No spaces around `=`
   - File is in the root directory (`D:\qpproject\.env.local`)

3. **Check browser console:**
   - Press F12 → Console tab
   - Look for specific error messages

4. **Verify Supabase credentials:**
   - Make sure URL starts with `https://`
   - Make sure anon key is the full long token

### If you get "Table does not exist":

- Run the SQL schema again in Supabase SQL Editor
- Make sure you copied ALL the code from SUPABASE_SCHEMA.sql

### If you get "Permission denied":

- Check Row Level Security (RLS) policies
- The SQL schema should have created the policy automatically
- If not, check TROUBLESHOOTING.md

---

## 🎯 What Should Happen

After completing these steps:

1. ✅ Server restarts without errors
2. ✅ You can add questions successfully
3. ✅ Questions appear in the questions list
4. ✅ You can generate question papers

---

## 📝 Quick Command Reference

```bash
# Stop server
Ctrl + C

# Start server
npm run dev

# Check if .env.local exists
# (In PowerShell)
Test-Path .env.local
```

---

## 🆘 Still Having Issues?

1. Check `TROUBLESHOOTING.md` for detailed help
2. Check browser console (F12) for error messages
3. Verify Supabase project is active (not paused)
4. Make sure internet connection is working

---

**You're almost there! Just restart the server and create the database table, then you're ready to go! 🚀**

