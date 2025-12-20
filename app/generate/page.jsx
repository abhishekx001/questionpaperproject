'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import QuestionPaperTemplate from '@/components/QuestionPaperTemplate';

export default function GeneratePage() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await supabase
        .from('questions')
        .select('subject')
        .order('subject');

      if (data) {
        const uniqueSubjects = [...new Set(data.map(q => q.subject).filter(Boolean))].sort();
        setAvailableSubjects(uniqueSubjects);
      }
    };
    fetchSubjects();
  }, []);

  const handleGenerate = async () => {
    if (!selectedSubject) {
      setError('Please select a subject first.');
      return;
    }

    setGenerating(true);
    setError('');
    setWarning('');
    setGeneratedPaper(null);

    try {
      const sections = [];

      // --- PART A: 8 questions of 3 marks each ---
      const { data: partAData, error: partAError } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', selectedSubject)
        .eq('marks', 3);

      if (partAError) throw partAError;

      let partAQuestions = partAData || [];
      if (partAQuestions.length < 8) {
        setWarning('Note: Some slots filled with placeholders due to insufficient 3-mark questions in the repository.');
        while (partAQuestions.length < 8) {
          partAQuestions.push({
            id: `placeholder-a-${partAQuestions.length}`,
            question_text: `[Sample Short Answer] Please add more 3-mark questions for ${selectedSubject}.`,
            marks: 3
          });
        }
      }

      sections.push({
        sectionName: 'PART A',
        type: 'partA',
        instructions: 'Answer all questions. Each question carries 3 marks',
        questions: shuffleArray(partAQuestions).slice(0, 8),
        totalMarks: 24
      });

      // --- PART B: 4 Modules with choice ---
      const modules = [];
      const moduleNumbers = ['1', '2', '3', '4'];
      const usedIds = sections[0].questions.map(q => q.id);

      for (const modNum of moduleNumbers) {
        const { data: modQuestions, error: modError } = await supabase
          .from('questions')
          .select('*')
          .eq('subject', selectedSubject)
          .eq('unit', modNum);

        if (modError) throw modError;

        const available = (modQuestions || []).filter(q => !usedIds.includes(q.id));
        let shuffled = shuffleArray(available);

        while (shuffled.length < 4) {
          shuffled.push({
            id: `placeholder-b-${modNum}-${shuffled.length}`,
            question_text: `[Sample Module ${modNum} Question] Add more descriptive questions for ${selectedSubject} in Module ${modNum}.`,
            marks: 5
          });
        }

        modules.push({
          moduleNumber: modNum,
          option1: [
            { ...shuffled[0], marks: 5 },
            { ...shuffled[1], marks: 4 }
          ],
          option2: [
            { ...shuffled[2], marks: 5 },
            { ...shuffled[3], marks: 4 }
          ]
        });
      }

      sections.push({
        sectionName: 'PART B',
        type: 'partB',
        instructions: 'Answer any 4 full questions with minimum one question from each Module. Each question carries 9 marks',
        modules: modules,
        totalMarks: 36
      });

      setGeneratedPaper(sections);
    } catch (err) {
      setError(err.message || 'Failed to generate paper');
    } finally {
      setGenerating(false);
    }
  };

  // Helper to ensure colors are safe for html2canvas
  const sanitizeColor = (color) => {
    if (!color) return color;
    if (color.includes('lab(') || color.includes('lch(') || color.includes('oklch(')) {
      return '#000000'; // Fallback to black for text
    }
    return color;
  };

  const handleDownloadPDF = async () => {
    if (!generatedPaper) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('question-paper');
      if (!element) return;

      // Create a clone for PDF generation
      const clone = element.cloneNode(true);

      // FORCE OVERRIDE: Reset all colors to standard RGB to prevent "lab()" errors
      // Tailwind v4 sometimes computes colors to lab() which html2canvas hates.
      const allElements = clone.getElementsByTagName('*');
      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i];
        // Force text to black
        el.style.color = '#000000';
        el.style.borderColor = '#000000';

        // Fix backgrounds
        const bg = window.getComputedStyle(element.getElementsByTagName('*')[i]).backgroundColor;
        if (bg && (bg.includes('lab') || bg.includes('lch'))) {
          el.style.backgroundColor = '#ffffff';
        }
      }

      // Clone container styling
      clone.style.width = '794px';
      clone.style.maxWidth = 'none';
      clone.style.position = 'absolute';
      clone.style.left = '0';
      clone.style.top = '0';
      clone.style.zIndex = '-9999';
      clone.style.backgroundColor = '#ffffff'; // Hex white
      clone.style.color = '#000000'; // Hex black
      document.body.appendChild(clone);

      // Delay for rendering
      await new Promise(resolve => setTimeout(resolve, 500));

      const opt = {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: `${selectedSubject.replace(/\s+/g, '_')}_Institutional_QP.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(clone).save();

      document.body.removeChild(clone);
    } catch (err) {
      console.error('PDF generation error:', err);
      // Simplify error message for user
      const msg = err.message.includes('lab') ? 'Browser color compatibility issue. Please try a different browser.' : err.message;
      alert(`PDF Generation Failed: ${msg}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight mb-2">
              Template <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Structure</span>
            </h1>
            <p className="text-lg text-[#64748b] font-medium">
              Generating specialized 60-mark institutional papers.
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-[#475569] border border-[#e2e8f0] shadow-sm hover:bg-[#f1f5f9] transition-all"
          >
            Dashboard
          </button>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-[#e2e8f0] overflow-hidden mb-10">
          <div className="p-6 md:p-10 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl text-3xl flex items-center justify-center mx-auto mb-6">📜</div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1e293b] mb-4">Select Target Subject</h2>
              <p className="text-[#64748b] mb-8 text-sm md:text-base">
                The engine curates 8 Short Answers (PART A) and 4 Module-wise choices (PART B) to match the institutional standard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setError('');
                    setWarning('');
                  }}
                  className="w-full sm:flex-1 max-w-none sm:max-w-sm px-6 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-[#1e293b] font-bold cursor-pointer transition-all"
                >
                  <option value="">Choose Subject...</option>
                  {availableSubjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>

                <button
                  onClick={handleGenerate}
                  disabled={generating || !selectedSubject}
                  className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-slate-900/20"
                >
                  {generating ? 'Processing Engine...' : 'Generate Format'}
                </button>
              </div>

              {(error || warning) && (
                <div className={`mt-6 p-4 rounded-2xl text-sm font-medium border ${error ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                  {error || warning}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {generatedPaper && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="flex items-center justify-between mb-6 px-4">
              <h3 className="text-xl font-extrabold text-[#1e293b]">Institutional Preview</h3>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-xl transition-all"
              >
                Download PDF
              </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-8 overflow-auto">
              <QuestionPaperTemplate
                courseName={selectedSubject}
                sections={generatedPaper}
                totalPaperMarks={60}
              />
            </div>
          </div>
        )}

        {/* Info Box */}
        {!generatedPaper && !generating && (
          <div className="bg-slate-900 rounded-[2rem] p-10 text-white">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500"></span>
              Format Workflow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-3">
                <div className="text-blue-400 font-bold">01. Part A (Shorts)</div>
                <p className="text-slate-400 text-sm">8 questions spanning across modules, each 3 marks.</p>
              </div>
              <div className="space-y-3">
                <div className="text-indigo-400 font-bold">02. Part B (Module Choice)</div>
                <p className="text-slate-400 text-sm">Creates 4 module-specific internal choices (A/B, etc.).</p>
              </div>
              <div className="space-y-3">
                <div className="text-purple-400 font-bold">03. Exact UI Rendering</div>
                <p className="text-slate-400 text-sm">Matches the institutional header and specific table format.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
