'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Successful login - redirect handled by middleware or manually
      router.push('/dashboard');

    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-500 flex flex-col items-center justify-center relative ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-xl transition-all duration-300 ${isDark
          ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 border border-slate-700'
          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        aria-label="Toggle Dark Mode"
      >
        {isDark ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-3xl transition-colors duration-500 ${isDark ? 'bg-blue-900/10' : 'bg-blue-500/5'}`}></div>
        <div className={`absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full blur-3xl transition-colors duration-500 ${isDark ? 'bg-indigo-900/10' : 'bg-indigo-500/5'}`}></div>
        <div className={`absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full blur-3xl transition-colors duration-500 ${isDark ? 'bg-purple-900/10' : 'bg-purple-500/5'}`}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header / Hero */}
        <header className="text-center mb-10">
          <div className={`inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-sm transition-colors duration-300 ${isDark
            ? 'bg-blue-900/30 border border-blue-800 text-blue-400'
            : 'bg-blue-50 border border-blue-100 text-blue-600'
            }`}>
            Institutional Edition
          </div>
          <h1 className={`text-4xl font-extrabold mb-2 tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
            Welcome Back
          </h1>
          <p className={`text-lg font-medium transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
            Sign in to access the Generator System.
          </p>
        </header>

        {/* Login Card */}
        <div className={`p-8 rounded-[2rem] shadow-xl border transition-all duration-300 ${isDark
          ? 'bg-slate-800 border-slate-700 shadow-blue-900/10'
          : 'bg-white border-[#e2e8f0] shadow-slate-200/50'
          }`}>

          {error && (
            <div className={`mb-6 p-4 rounded-xl flex items-center text-sm font-bold ${isDark
              ? 'bg-rose-900/30 text-rose-300 border border-rose-800'
              : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-5 py-4 rounded-2xl outline-none font-medium transition-all duration-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${isDark
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-600'
                  : 'bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8]'}`}
                placeholder="name@institution.edu"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-5 py-4 rounded-2xl outline-none font-medium transition-all duration-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${isDark
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-600'
                  : 'bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8]'}`}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all duration-200 flex justify-center items-center ${isDark
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className={`text-center mt-8 text-sm font-medium ${isDark ? 'text-slate-500' : 'text-[#94a3b8]'}`}>
          © 2025 EduTech. All rights reserved.
        </p>
      </div>
    </div>
  );
}
