'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-500 ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header / Hero */}
        <header className="text-center mb-16 lg:mb-24">
          <div className={`inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-sm transition-colors duration-300 ${isDark
              ? 'bg-blue-900/30 border border-blue-800 text-blue-400'
              : 'bg-blue-50 border border-blue-100 text-blue-600'
            }`}>
            Institutional Edition
          </div>
          <h1 className={`text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
            Question Paper <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradient-x">
              Generator System
            </span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto font-medium leading-relaxed transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
            Create professional, randomized examination papers in seconds.
            Streamlined for academic excellence and institutional standards.
          </p>

          {/* Primary Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              className={`group px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 ${isDark
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                }`}
            >
              Access Dashboard
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/questions/add"
              className={`px-8 py-4 border rounded-2xl font-bold text-lg shadow-sm transition-all duration-300 ${isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600'
                  : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-blue-200 hover:text-blue-600'
                }`}
            >
              Add New Questions
            </Link>
          </div>
        </header>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: '📝',
              title: 'Smart Repository',
              desc: 'Organize thousands of questions with metadata like module, marks, and subject.',
              bgLight: 'bg-blue-50', textLight: 'text-blue-600', borderLight: 'border-blue-100',
              bgDark: 'bg-blue-900/20', textDark: 'text-blue-400', borderDark: 'border-blue-800/50'
            },
            {
              icon: '⚡',
              title: 'Instant Generation',
              desc: 'Generate strictly formatted papers with one click using our intelligent randomization engine.',
              bgLight: 'bg-indigo-50', textLight: 'text-indigo-600', borderLight: 'border-indigo-100',
              bgDark: 'bg-indigo-900/20', textDark: 'text-indigo-400', borderDark: 'border-indigo-800/50'
            },
            {
              icon: '🎓',
              title: 'Institutional PDF',
              desc: 'Export high-fidelity PDFs that exactly match your university\'s official template.',
              bgLight: 'bg-purple-50', textLight: 'text-purple-600', borderLight: 'border-purple-100',
              bgDark: 'bg-purple-900/20', textDark: 'text-purple-400', borderDark: 'border-purple-800/50'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2rem] shadow-xl border transition-all duration-300 group ${isDark
                  ? 'bg-slate-800 border-slate-700 hover:border-blue-500/30 hover:shadow-blue-900/10'
                  : 'bg-white border-[#e2e8f0] shadow-slate-200/50 hover:border-blue-300/50 hover:shadow-blue-500/10'
                }`}
            >
              <div className={`w-14 h-14 border rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 ${isDark
                  ? `${feature.bgDark} ${feature.textDark} ${feature.borderDark}`
                  : `${feature.bgLight} ${feature.textLight} ${feature.borderLight}`
                }`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-black mb-3 transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-[#1e293b] group-hover:text-blue-700'}`}>
                {feature.title}
              </h3>
              <p className={`font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Links Footer */}
        <div className={`border-t pt-12 flex flex-col md:flex-row justify-between items-center text-sm font-medium transition-colors duration-300 ${isDark ? 'border-slate-800 text-slate-500' : 'border-[#e2e8f0] text-[#94a3b8]'}`}>
          <p>© 2025 Antigravity EduTech. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/generate" className="hover:text-blue-600 transition-colors">Quick Generate</Link>
            <Link href="/template-preview" className="hover:text-blue-600 transition-colors">View Template</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
