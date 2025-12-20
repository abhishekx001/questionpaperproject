import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
// Using anon key only - all operations are done client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = `
    ============================================
    ⚠️  SUPABASE CONFIGURATION MISSING  ⚠️
    ============================================
    
    Please create a .env.local file in the root directory with:
    
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    
    Get these from: https://app.supabase.com → Your Project → Settings → API
    
    See ENV_SETUP.md for detailed instructions.
    
    After creating .env.local, restart your development server.
    ============================================
  `;
  
  console.error(errorMsg);
  
  // Show alert in browser
  if (typeof window !== 'undefined') {
    alert('Supabase configuration missing! Please check the console and create .env.local file. See ENV_SETUP.md for instructions.');
  }
}

// Create and export Supabase client
// Will throw error if URL/key are invalid, but allows app to load
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
