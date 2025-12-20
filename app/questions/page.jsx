'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function QuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterMarks, setFilterMarks] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [marksOptions, setMarksOptions] = useState([]);

  // Fetch questions from Supabase
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');

    try {
      let query = supabase.from('questions').select('*').order('created_at', { ascending: false });

      // Apply filters if set
      if (filterSubject) {
        query = query.eq('subject', filterSubject);
      }
      if (filterMarks) {
        query = query.eq('marks', parseInt(filterMarks));
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setQuestions(data || []);

      // Extract unique subjects and marks for filters
      if (data) {
        const uniqueSubjects = [...new Set(data.map(q => q.subject).filter(Boolean))].sort();
        const uniqueMarks = [...new Set(data.map(q => q.marks).filter(Boolean))].sort((a, b) => a - b);
        setSubjects(uniqueSubjects);
        setMarksOptions(uniqueMarks);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  // Refetch when filters change
  useEffect(() => {
    fetchQuestions();
  }, [filterSubject, filterMarks]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Refresh questions list
      fetchQuestions();
    } catch (err) {
      alert('Failed to delete question: ' + err.message);
    }
  };

  // Group questions by subject and marks
  const groupedQuestions = questions.reduce((acc, question) => {
    const key = `${question.subject || 'No Subject'}_${question.marks || 'No Marks'}`;
    if (!acc[key]) {
      acc[key] = {
        subject: question.subject || 'No Subject',
        marks: question.marks || 'No Marks',
        questions: [],
      };
    }
    acc[key].questions.push(question);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight mb-2">
              Question Bank
            </h1>
            <p className="text-lg text-[#64748b]">
              Manage and organize your academic questions repository.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/questions/add')}
              className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-200 transform active:scale-[0.98]"
            >
              + Add New Question
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold bg-white text-[#475569] border border-[#e2e8f0] shadow-sm hover:bg-[#f1f5f9] transition-all duration-200"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-[#e2e8f0] p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-[#1e293b]">Quick Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="filterSubject" className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
                By Subject
              </label>
              <select
                id="filterSubject"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-5 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-[#1e293b] transition-all duration-200"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="filterMarks" className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
                By Weightage
              </label>
              <select
                id="filterMarks"
                value={filterMarks}
                onChange={(e) => setFilterMarks(e.target.value)}
                className="w-full px-5 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-[#1e293b] transition-all duration-200"
              >
                <option value="">All Marks</option>
                {marksOptions.map((mark) => (
                  <option key={mark} value={mark}>
                    {mark} marks
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterSubject('');
                  setFilterMarks('');
                }}
                className="w-full px-5 py-3.5 bg-[#f1f5f9] text-[#475569] rounded-2xl font-bold hover:bg-[#e2e8f0] transition-all duration-200"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl animate-in fade-in duration-300">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-[#64748b] font-medium text-lg">Synchronizing repository...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && questions.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-[#e2e8f0] p-16 text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              📚
            </div>
            <h3 className="text-2xl font-bold text-[#1e293b] mb-2">No results found</h3>
            <p className="text-[#64748b] mb-8 max-w-md mx-auto">
              {filterSubject || filterMarks
                ? 'Try adjusting your filters to find the questions you are looking for.'
                : 'Start building your bank by adding your first academic question.'}
            </p>
            <button
              onClick={() => router.push('/questions/add')}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-200"
            >
              Add Your First Question
            </button>
          </div>
        )}

        {/* Grouped Questions List */}
        {!loading && questions.length > 0 && (
          <div className="space-y-8">
            {Object.values(groupedQuestions).map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-[#e2e8f0] overflow-hidden">
                <div className="p-6 bg-[#f8fafc] border-b border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1e293b]">
                      {group.subject}
                    </h3>
                    <p className="text-[#64748b] font-medium mt-0.5">
                      Batch: {group.marks} Marks Questions
                    </p>
                  </div>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-white text-blue-600 border border-blue-100 shadow-sm">
                    {group.questions.length} question{group.questions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 gap-6">
                    {group.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="group p-6 border border-[#e2e8f0] rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 relative"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              <span className="text-sm font-black text-blue-600">
                                Q{index + 1}.
                              </span>
                              <span className="px-3 py-1 bg-white text-[#475569] border border-[#e2e8f0] rounded-lg text-xs font-bold shadow-sm">
                                {question.marks} MARKS
                              </span>
                              {question.unit && (
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-bold uppercase tracking-tight">
                                  {question.unit}
                                </span>
                              )}
                            </div>
                            <p className="text-[#334155] text-lg leading-relaxed font-medium">
                              {question.question_text}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(question.id)}
                            className="inline-flex items-center px-4 py-2 text-sm font-bold text-rose-600 bg-white border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-200 shadow-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global Summary */}
        {!loading && questions.length > 0 && (
          <div className="mt-12 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl text-white shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-10">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Repository</p>
                  <p className="text-2xl font-black">{questions.length} <span className="text-lg font-normal text-slate-400">Questions</span></p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Subjects Covered</p>
                  <p className="text-2xl font-black">{subjects.length}</p>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-700 hidden md:block"></div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Available Marks</p>
                <div className="flex gap-2">
                  {marksOptions.map(m => (
                    <span key={m} className="px-3 py-1 bg-slate-700 rounded-lg text-xs font-bold">{m}pts</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

