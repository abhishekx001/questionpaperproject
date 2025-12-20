# How to Get Your Supabase Credentials

Since you've already created your Supabase project, follow these steps to get your credentials:

## Step-by-Step Guide

### Step 1: Open Your Supabase Project
1. Go to **https://app.supabase.com**
2. **Sign in** to your account
3. You should see your project in the dashboard
4. **Click on your project** to open it

### Step 2: Navigate to API Settings
1. In the left sidebar, click on **Settings** (⚙️ gear icon)
2. Click on **API** in the settings menu

### Step 3: Find Your Credentials
You'll see two important values:

#### 1. Project URL
- Look for **"Project URL"** or **"URL"**
- It looks like: `https://abcdefghijklmnop.supabase.co`
- **Copy this entire URL**

#### 2. anon public Key
- Look for **"Project API keys"** section
- Find the **"anon public"** key (NOT the service_role key!)
- It's a long token starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Copy this entire key**

### Step 4: Fill in `.env.local` File

1. Open the file `.env.local` in your project folder (`D:\qpproject\.env.local`)

2. Paste your credentials like this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-full-key-here
```

**Important:**
- ✅ No quotes around the values
- ✅ No spaces around the `=` sign
- ✅ Copy the ENTIRE key (it's very long)
- ✅ Make sure the URL starts with `https://`

### Step 5: Save and Restart

1. **Save** the `.env.local` file
2. **Stop** your dev server (Ctrl+C)
3. **Restart** it: `npm run dev`

---

## Visual Guide

```
Supabase Dashboard
│
├── Your Project Name
│   │
│   ├── Settings (⚙️)  ← Click here
│   │   │
│   │   └── API  ← Click here
│   │       │
│   │       ├── Project URL: https://xxxxx.supabase.co  ← Copy this
│   │       │
│   │       └── Project API keys:
│   │           ├── anon public: eyJ...  ← Copy this (long token)
│   │           └── service_role: (DO NOT use this one!)
```

---

## Example of What Your File Should Look Like

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.abcdefghijklmnopqrstuvwxyz1234567890
```

---

## ⚠️ Common Mistakes to Avoid

1. ❌ Using `service_role` key instead of `anon public` key
2. ❌ Adding quotes: `NEXT_PUBLIC_SUPABASE_URL="https://..."`
3. ❌ Adding spaces: `NEXT_PUBLIC_SUPABASE_URL = https://...`
4. ❌ Not copying the full key (it's very long!)
5. ❌ Forgetting to restart the server after creating the file

---

## ✅ After Filling In

Once you've filled in both values:
1. Save the file
2. Restart your dev server
3. Try adding a question again - it should work!

