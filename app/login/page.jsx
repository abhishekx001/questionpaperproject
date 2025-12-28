'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/components/ThemeProvider';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDark } = useTheme();
  const mode = searchParams.get('mode') || 'login'; // 'login' or 'signup'
  const isSignup = mode === 'signup';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignup) {
        // Sign up
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          setMessage('Account created! Please check your email to verify your account.');
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        }
      } else {
        // Sign in
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data.user) {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`max-w-md w-full rounded-lg shadow-xl p-8 transition-colors duration-300 ${isDark ? 'bg-slate-800 text-white shadow-slate-900/50' : 'bg-white text-gray-900'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isSignup ? 'Create Account' : 'Sign In'}
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
            {isSignup
              ? 'Create a new account to get started'
              : 'Sign in to your account to continue'}
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className={`mb-4 p-3 border rounded ${isDark ? 'bg-rose-900/30 border-rose-800 text-rose-300' : 'bg-red-100 border-red-400 text-red-700'}`}>
            {error}
          </div>
        )}
        {message && (
          <div className={`mb-4 p-3 border rounded ${isDark ? 'bg-emerald-900/30 border-emerald-800 text-emerald-300' : 'bg-green-100 border-green-400 text-green-700'}`}>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${isDark
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${isDark
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between login/signup */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <Link
              href={isSignup ? '/login' : '/login?mode=signup'}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className={`text-sm hover:text-gray-700 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-gray-500 hover:text-gray-700'}`}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

