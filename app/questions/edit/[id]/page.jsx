'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/components/ThemeProvider';

export default function EditQuestionPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { isDark } = useTheme();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [questionText, setQuestionText] = useState('');
    const [marks, setMarks] = useState('');
    const [subject, setSubject] = useState('');
    const [module, setModule] = useState('');
    const [partBType, setPartBType] = useState('any');

    useEffect(() => {
        if (id) {
            fetchQuestion(id);
        }
    }, [id]);

    const fetchQuestion = async (questionId) => {
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('id', questionId)
                .single();

            if (error) throw error;

            if (data) {
                setQuestionText(data.question_text);
                setMarks(data.marks);
                setSubject(data.subject);
                setModule(data.unit || '');
                setPartBType(data.part_b_type || 'any');
            }
        } catch (err) {
            setError('Failed to fetch question details: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        // Validation
        if (!questionText.trim()) {
            setError('Question text is required');
            setSubmitting(false);
            return;
        }

        if (!marks || marks <= 0) {
            setError('Marks must be a positive number');
            setSubmitting(false);
            return;
        }

        if (!subject.trim()) {
            setError('Subject is required');
            setSubmitting(false);
            return;
        }

        try {
            // Update question in Supabase
            const { error: updateError } = await supabase
                .from('questions')
                .update({
                    question_text: questionText.trim(),
                    marks: parseInt(marks),
                    subject: subject.trim(),
                    unit: module || null,
                    part_b_type: partBType || 'any',
                })
                .eq('id', id);

            if (updateError) throw updateError;

            // Success
            setSuccess('Question updated successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/questions');
            }, 1500);

        } catch (err) {
            console.error('Error updating question:', err);
            setError(err.message || 'Failed to update question');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
                <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 transition-colors ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
                            Edit Question
                        </h1>
                        <p className={`text-base md:text-lg transition-colors ${isDark ? 'text-slate-400' : 'text-[#64748b]'}`}>
                            Update details for this question.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => router.push('/questions')}
                            className={`flex-1 md:flex-none justify-center inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold border shadow-sm transition-all duration-200 ${isDark
                                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                                : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f1f5f9]'}`}
                        >
                            Cancel
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
                                    disabled={submitting}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                                >
                                    {submitting ? 'Updating...' : 'Update Question'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
