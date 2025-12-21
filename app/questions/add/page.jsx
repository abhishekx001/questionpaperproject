'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/components/ThemeProvider';

export default function AddQuestionPage() {
  const router = useRouter();
  const { isDark } = useTheme();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [questionText, setQuestionText] = useState('');
  const [marks, setMarks] = useState('');
  const [subject, setSubject] = useState('');
  const [module, setModule] = useState('');
  const [partBType, setPartBType] = useState('any');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!questionText.trim()) {
      setError('Question text is required');
      setLoading(false);
      return;
    }

    if (!marks || marks <= 0) {
      setError('Marks must be a positive number');
      setLoading(false);
      return;
    }

    if (!subject.trim()) {
      setError('Subject is required');
      setLoading(false);
      return;
    }

    try {
      // Insert question into Supabase
      const { data, error: insertError } = await supabase
        .from('questions')
        .insert([
          {
            question_text: questionText.trim(),
            marks: parseInt(marks),
            subject: subject.trim(),
            unit: module || null, // Keeping the column name 'unit' in DB but mapped to UI 'module'
            part_b_type: partBType || 'any',
          },
        ])
        .select();

      if (insertError) {
        // Provide more detailed error messages
        let errorMessage = insertError.message || 'Failed to add question';

        if (insertError.code === 'PGRST116') {
          errorMessage = 'The "questions" table does not exist. Please run the SQL schema from SUPABASE_SCHEMA.sql in your Supabase SQL Editor.';
        } else if (insertError.code === '42501') {
          errorMessage = 'Permission denied. Please check your Row Level Security (RLS) policies in Supabase.';
        } else if (insertError.message && insertError.message.includes('Failed to fetch')) {
          errorMessage = 'Network error: Could not connect to Supabase. Please check: 1) Your internet connection, 2) Supabase URL in .env.local, 3) That your Supabase project is active.';
        } else if (insertError.message && insertError.message.includes('Invalid API key')) {
          errorMessage = 'Invalid Supabase API key. Please check your NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local file.';
        }

        console.error('Supabase Error Details:', {
          message: insertError.message,
          code: insertError.code,
          details: insertError.details,
          hint: insertError.hint,
          fullError: insertError
        });
        throw new Error(errorMessage);
      }

      // Success
      setSuccess('Question added successfully!');

      // Reset form
      setQuestionText('');
      setMarks('');
      setSubject('');
      setModule('');
      setPartBType('any');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error('Error adding question:', err);
      setError(err.message || 'Failed to add question. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 transition-colors ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
              Add New Question
            </h1>
            <p className={`text-base md:text-lg transition-colors ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
              Contribute to the academic repository.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/questions')}
              className={`flex-1 md:flex-none justify-center inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold border shadow-sm transition-all duration-200 ${isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f1f5f9]'}`}
            >
              View Questions
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className={`flex-1 md:flex-none justify-center inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold border shadow-sm transition-all duration-200 ${isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f1f5f9]'}`}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Main Form Card */}
        <div className={`rounded-3xl shadow-xl border overflow-hidden transition-colors ${isDark
          ? 'bg-slate-800 border-slate-700 shadow-slate-900/20'
          : 'bg-white border-[#e2e8f0] shadow-slate-200/50'}`}>
          <div className="p-6 md:p-10">
            {/* Success/Error Alerts */}
            {success && (
              <div className={`mb-8 p-4 rounded-2xl flex items-center animate-in fade-in slide-in-from-top-4 duration-300 ${isDark
                ? 'bg-emerald-900/30 border border-emerald-800 text-emerald-300'
                : 'bg-emerald-50 border border-emerald-100 text-emerald-700'}`}>
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            )}

            {error && (
              <div className={`mb-8 p-4 rounded-2xl flex items-center animate-in fade-in slide-in-from-top-4 duration-300 ${isDark
                ? 'bg-rose-900/30 border border-rose-800 text-rose-300'
                : 'bg-rose-50 border border-rose-100 text-rose-700'}`}>
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question Text */}
              <div className="space-y-3">
                <label htmlFor="questionText" className={`text-sm font-bold uppercase tracking-wider flex items-center ${isDark ? 'text-slate-300' : 'text-[#334155]'}`}>
                  Question Content <span className="text-rose-500 ml-1">*</span>
                </label>
                <textarea
                  id="questionText"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  rows={5}
                  className={`w-full px-5 py-4 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none transition-all duration-200 ${isDark
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8]'}`}
                  placeholder="Enter the complete question text here..."
                />
              </div>

              {/* Grid Layout for Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Subject */}
                <div className="space-y-3">
                  <label htmlFor="subject" className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#334155]'}`}>
                    Subject <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className={`w-full px-5 py-3.5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 ${isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8]'}`}
                    placeholder="e.g. Mathematics"
                  />
                </div>

                {/* Marks */}
                <div className="space-y-3">
                  <label htmlFor="marks" className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#334155]'}`}>
                    Weightage (Marks) <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <input
                    id="marks"
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    required
                    min="1"
                    className={`w-full px-5 py-3.5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 ${isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8]'}`}
                    placeholder="e.g. 10"
                  />
                </div>

                {/* Module */}
                <div className="space-y-3">
                  <label htmlFor="module" className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#334155]'}`}>
                    Module
                  </label>
                  <select
                    id="module"
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    className={`w-full px-5 py-3.5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 ${isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b]'}`}
                  >
                    <option value="">Select Module</option>
                    {[1, 2, 3, 4, 5].map((m) => (
                      <option key={m} value={`Module ${m}`}>
                        Module {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Part B Preference - Only if Marks > 3 */}
                {marks && parseInt(marks) > 3 && (
                  <div className="space-y-3">
                    <label htmlFor="partBType" className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#334155]'}`}>
                      Part B Placement
                    </label>
                    <div className="relative">
                      <select
                        id="partBType"
                        value={partBType}
                        onChange={(e) => setPartBType(e.target.value)}
                        className={`w-full px-5 py-3.5 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none appearance-none transition-all duration-200 ${isDark
                          ? 'bg-indigo-900/20 border-indigo-800 text-white'
                          : 'bg-indigo-50/50 border border-indigo-100 text-[#1e293b]'}`}
                      >
                        <option value="any">Any (Default)</option>
                        <option value="option1">Option 1 (Before OR)</option>
                        <option value="option2">Option 2 (After OR)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-indigo-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                  {loading ? 'Processing...' : 'Publish Question'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuestionText('');
                    setMarks('');
                    setSubject('');
                    setModule('');
                    setPartBType('any');
                    setError('');
                    setSuccess('');
                  }}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all duration-200 transform active:scale-[0.98] ${isDark
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'}`}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
