'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/components/ThemeProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { isDark } = useTheme();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-3 transition-colors ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
              Control <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Center</span>
            </h1>
            <p className={`text-lg font-medium transition-colors ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
              Academic Resource Management & Paper Generation System.
            </p>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold shadow-sm transition-all duration-200 ${isDark
                ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                : 'bg-white text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]'}`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        {/* Hero Welcome Card */}
        <div className="relative mb-12 rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative p-10 md:p-14 text-white">
            <h2 className="text-3xl font-extrabold mb-4">Welcome back, Editor!</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Your academic dashboard is ready. Streamline your workflow by managing the central question repository or generating high-quality exam papers in seconds.
            </p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {/* Action 1: Add Question */}
          <Link
            href="/questions/add"
            className={`group relative p-8 rounded-[2rem] shadow-xl border transition-all duration-300 hover:-translate-y-2 ${isDark
              ? 'bg-slate-800 border-slate-700 shadow-emerald-900/10 hover:border-emerald-500/30'
              : 'bg-white border-[#e2e8f0] shadow-slate-200/50 hover:border-emerald-200'}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 ${isDark
              ? 'bg-emerald-900/30 text-emerald-400'
              : 'bg-emerald-50 text-emerald-600'}`}>
              ✍️
            </div>
            <h3 className={`text-xl font-bold mb-3 transition-colors ${isDark ? 'text-white group-hover:text-emerald-400' : 'text-[#1e293b] group-hover:text-emerald-600'}`}>
              Add Question
            </h3>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
              Quickly contribute new questions to the repository with detailed metadata.
            </p>
            <div className="mt-6 flex items-center text-emerald-600 font-bold text-sm">
              Create New
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>

          {/* Action 2: Generate */}
          <Link
            href="/generate"
            className={`group relative p-8 rounded-[2rem] shadow-xl border transition-all duration-300 hover:-translate-y-2 ${isDark
              ? 'bg-slate-800 border-slate-700 shadow-blue-900/10 hover:border-blue-500/30'
              : 'bg-white border-[#e2e8f0] shadow-slate-200/50 hover:border-blue-200'}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 ${isDark
              ? 'bg-blue-900/30 text-blue-400'
              : 'bg-blue-50 text-blue-600'}`}>
              📊
            </div>
            <h3 className={`text-xl font-bold mb-3 transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-[#1e293b] group-hover:text-blue-600'}`}>
              Generate Paper
            </h3>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
              Use the intelligent algorithm to curate balanced exam papers from your repository.
            </p>
            <div className="mt-6 flex items-center text-blue-600 font-bold text-sm">
              Launch Generator
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>

          {/* Action 3: Repository */}
          <Link
            href="/questions"
            className={`group relative p-8 rounded-[2rem] shadow-xl border transition-all duration-300 hover:-translate-y-2 ${isDark
              ? 'bg-slate-800 border-slate-700 shadow-indigo-900/10 hover:border-indigo-500/30'
              : 'bg-white border-[#e2e8f0] shadow-slate-200/50 hover:border-indigo-200'}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 ${isDark
              ? 'bg-indigo-900/30 text-indigo-400'
              : 'bg-indigo-50 text-indigo-600'}`}>
              📚
            </div>
            <h3 className={`text-xl font-bold mb-3 transition-colors ${isDark ? 'text-white group-hover:text-indigo-400' : 'text-[#1e293b] group-hover:text-indigo-600'}`}>
              Question Bank
            </h3>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
              Manage, categorize, and update your academic resources in the central repository.
            </p>
            <div className="mt-6 flex items-center text-indigo-600 font-bold text-sm">
              Explore Repository
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>

          {/* Action 4: Template */}
          <Link
            href="/template-preview"
            className={`group relative p-8 rounded-[2rem] shadow-xl border transition-all duration-300 hover:-translate-y-2 ${isDark
              ? 'bg-slate-800 border-slate-700 shadow-slate-900/10 hover:border-slate-500/30'
              : 'bg-white border-[#e2e8f0] shadow-slate-200/50 hover:border-slate-300'}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 ${isDark
              ? 'bg-slate-700 text-slate-300'
              : 'bg-slate-100 text-slate-800'}`}>
              📐
            </div>
            <h3 className={`text-xl font-bold mb-3 transition-colors ${isDark ? 'text-white group-hover:text-slate-300' : 'text-[#1e293b] group-hover:text-slate-800'}`}>
              Structure Designer
            </h3>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
              Configure and preview the paper blueprints and structural layouts for generation.
            </p>
            <div className={`mt-6 flex items-center font-bold text-sm ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              View Blueprints
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Getting Started Guide */}
        <div className={`rounded-[2rem] shadow-xl border p-10 transition-colors ${isDark
          ? 'bg-slate-800 border-slate-700 shadow-slate-900/20'
          : 'bg-white border-[#e2e8f0] shadow-slate-200/50'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>Getting Started Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">01</div>
              <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>Populate Bank</p>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>Add high-quality questions categorized by subject and module numbers.</p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">02</div>
              <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>Define Blueprint</p>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>Configure Sections and weightage for different parts of the question paper.</p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">03</div>
              <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>Execute Engine</p>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>Run the generation engine to pull randomized questions into your defined structure.</p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">04</div>
              <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>Final Export</p>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>Preview the generated paper and export it to high-fidelity PDF format.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
