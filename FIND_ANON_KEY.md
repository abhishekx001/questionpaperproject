# 🔍 How to Find Your Supabase Anon Key

## Step-by-Step Visual Guide

### Step 1: Open Your Supabase Project
1. Go to **https://app.supabase.com**
2. **Sign in** to your account
3. You'll see a list of your projects
4. **Click on your project name** to open it

### Step 2: Go to Settings
1. Look at the **left sidebar** (vertical menu on the left side)
2. Find and click on **Settings** (⚙️ gear icon)
   - It's usually near the bottom of the sidebar
   - Icon looks like a gear/cog

### Step 3: Click on "API"
1. After clicking Settings, you'll see a submenu
2. Click on **"API"** in that submenu
   - It should be the first or second option

### Step 4: Find the Anon Key
1. You'll see a page with several sections
2. Look for **"Project API keys"** section
   - It's usually in the middle or bottom of the page
   - Has a heading "Project API keys"

3. Under "Project API keys", you'll see multiple keys:
   - **anon public** ← THIS IS THE ONE YOU NEED!
   - service_role (DO NOT use this one!)
   - Maybe others

4. The **anon public** key will:
   - Be labeled as "anon" or "anon public"
   - Have a long token that starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Have a **copy button** (📋 icon) next to it

5. **Click the copy button** next to "anon public" to copy it

---

## 📍 Exact Location Path

```
Supabase Dashboard
  └── Your Project (click on it)
      └── Left Sidebar
          └── Settings ⚙️ (click here)
              └── API (click here)
                  └── Scroll down to "Project API keys"
                      └── anon public (copy this one!)
```

---

## 🖼️ What It Looks Like

The page should show something like:

```
┌─────────────────────────────────────┐
│  API Settings                        │
├─────────────────────────────────────┤
│                                     │
│  Project URL                        │
│  https://xxxxx.supabase.co          │
│  [Copy]                             │
│                                     │
│  Project API keys                   │
│  ┌───────────────────────────────┐ │
│  │ anon public                    │ │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6...│ │
│  │ [📋 Copy]                      │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ service_role                  │ │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6...│ │
│  │ [📋 Copy]                      │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**You want the "anon public" one!**

---

## 🔑 Alternative: If You Can't Find It

### Method 1: Check Project Settings
1. Go to **Settings** → **General**
2. Look for "Project URL" and "API Keys" section
3. The anon key should be there

### Method 2: Use the Search
1. In Supabase dashboard, use the search bar (top)
2. Type "API" or "anon"
3. It should show you the API settings page

### Method 3: Direct URL
1. The URL should look like:
   ```
   https://app.supabase.com/project/your-project-id/settings/api
   ```
2. Replace `your-project-id` with your actual project ID
3. This takes you directly to the API settings

---

## ✅ What the Anon Key Looks Like

The anon key is a **very long string** that:
- Starts with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- Is usually 200-300+ characters long
- Contains letters, numbers, dots (.), and dashes (-)
- Looks like a JWT token

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.abcdefghijklmnopqrstuvwxyz1234567890
```

---

## ⚠️ Important Notes

1. **Use "anon public"** - NOT "service_role"
2. **Copy the ENTIRE key** - it's very long, make sure you get it all
3. **No spaces** when pasting into `.env.local`
4. **The key is visible** - you don't need to click "reveal" or anything

---

## 🆘 Still Can't Find It?

If you still can't find it:

1. **Check if you're in the right project** - make sure you clicked on your project first
2. **Look for "API" in the Settings menu** - it might be under a different section
3. **Try the search function** - search for "anon" or "API key"
4. **Check the Supabase documentation** - https://supabase.com/docs/guides/api

---

## 📝 Once You Find It

1. **Copy the anon public key** (click the copy button)
2. **Open** `D:\qpproject\.env.local`
3. **Paste it** after `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
4. **Save the file**
5. **Restart your server**

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.paste-your-full-key-here
```

