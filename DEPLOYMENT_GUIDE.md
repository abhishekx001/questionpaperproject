# Deployment Configuration Guide

## ⚠️ Important: Connecting Supabase to Vercel

The error "Supabase configuration missing" occurs because your **Environment Variables** (API Keys) are not yet set up in your Vercel project. For security, these keys are not uploaded with your code.

### ✅ How to Fix

1.  **Go to Vercel Dashboard**:
    *   Open your project in Vercel.
    *   Navigate to **Settings** > **Environment Variables**.

2.  **Add Your Supabase Keys**:
    You need to add the exact same keys you have in your local `.env.local` file.

    *   **Key:** `NEXT_PUBLIC_SUPABASE_URL`
        *   **Value:** (Copy from your Supabase Project Settings -> API)
    
    *   **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        *   **Value:** (Copy from your Supabase Project Settings -> API)

3.  **Redeploy**:
    *   After adding the variables, go to **Deployments**.
    *   Click the **three dots** (...) on the failed deployment -> **Redeploy**.
    *   Click **Redeploy** again.

Your application will now build successfully!

---
*Note: Make sure there are no extra spaces when pasting the keys.*
