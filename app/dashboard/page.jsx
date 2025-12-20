'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#1e293b] tracking-tight mb-3">
              Control <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Center</span>
            </h1>
            <p className="text-lg text-[#64748b] font-medium">
              Academic Resource Management & Paper Generation System.
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold bg-white text-[#475569] border border-[#e2e8f0] shadow-sm hover:bg-[#f1f5f9] transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Sign Out
            </Link>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Action 1: Generate */}
          <Link
            href="/generate"
            className="group relative bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[#e2e8f0] hover:border-blue-200 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
              📊
            </div>
            <h3 className="text-xl font-bold text-[#1e293b] mb-3 group-hover:text-blue-600 transition-colors">
              Generate Paper
            </h3>
            <p className="text-[#64748b] leading-relaxed">
              Use the intelligent algorithm to curate balanced exam papers from your repository.
            </p>
            <div className="mt-6 flex items-center text-blue-600 font-bold text-sm">
              Launch Generator
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>

          {/* Action 2: Repository */}
          <Link
            href="/questions"
            className="group relative bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[#e2e8f0] hover:border-indigo-200 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
              📚
            </div>
            <h3 className="text-xl font-bold text-[#1e293b] mb-3 group-hover:text-indigo-600 transition-colors">
              Question Bank
            </h3>
            <p className="text-[#64748b] leading-relaxed">
              Manage, categorize, and update your academic resources in the central repository.
            </p>
            <div className="mt-6 flex items-center text-indigo-600 font-bold text-sm">
              Explore Repository
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>

          {/* Action 3: Template */}
          <Link
            href="/template-preview"
            className="group relative bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[#e2e8f0] hover:border-slate-300 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
              📐
            </div>
            <h3 className="text-xl font-bold text-[#1e293b] mb-3 group-hover:text-slate-800 transition-colors">
              Structure Designer
            </h3>
            <p className="text-[#64748b] leading-relaxed">
              Configure and preview the paper blueprints and structural layouts for generation.
            </p>
            <div className="mt-6 flex items-center text-slate-800 font-bold text-sm">
              View Blueprints
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[#e2e8f0] p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-[#1e293b]">Getting Started Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">01</div>
              <p className="text-[#334155] font-bold">Populate Bank</p>
              <p className="text-sm text-[#64748b]">Add high-quality questions categorized by subject and module numbers.</p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">02</div>
              <p className="text-[#334155] font-bold">Define Blueprint</p>
              <p className="text-sm text-[#64748b]">Configure Sections and weightage for different parts of the question paper.</p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">03</div>
              <p className="text-[#334155] font-bold">Execute Engine</p>
              <p className="text-sm text-[#64748b]">Run the generation engine to pull randomized questions into your defined structure.</p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">04</div>
              <p className="text-[#334155] font-bold">Final Export</p>
              <p className="text-sm text-[#64748b]">Preview the generated paper and export it to high-fidelity PDF format.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
