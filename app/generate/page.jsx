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
  const handleDownloadPDF = async () => {
    if (!generatedPaper) return;

    let container = null;

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      // 1. Construct Raw HTML (Clean Room Approach)
      // We rebuild the DOM string manually to bypass ALL external CSS/Tailwind dependencies.
      // This guarantees no "lab()" colors or modern CSS crashes html2canvas.

      const getPageHTML = () => {
        const borderStyle = 'border: 1px solid black; border-collapse: collapse;';
        const cellStyle = 'border: 1px solid black; padding: 5px; text-align: left; vertical-align: top; font-size: 12px;';
        const centerStyle = 'text-align: center;';
        const boldStyle = 'font-weight: bold;';

        // Helper to render sections
        const renderSections = () => generatedPaper.map(section => `
          <div style="margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 5px;">
              <div style="font-weight: bold; font-size: 14px; border-top: 2px solid black; border-bottom: 2px solid black; display: inline-block; padding: 2px 10px;">
                ${section.sectionName}
              </div>
              <div style="font-size: 10px; font-style: italic; margin-top: 2px;">${section.instructions}</div>
            </div>
            
            <table style="width: 100%; ${borderStyle} font-size: 12px;">
              <thead>
                <tr style="background-color: #f0f0f0;">
                  <th style="${cellStyle} width: 40px; text-align: center;">No</th>
                  <th style="${cellStyle} text-align: center;">Questions</th>
                  <th style="${cellStyle} width: 60px; text-align: center;">Marks</th>
                </tr>
              </thead>
              <tbody>
                ${section.type === 'partA'
            ? section.questions.map((q, idx) => `
                    <tr>
                      <td style="${cellStyle} text-align: center;">${idx + 1}</td>
                      <td style="${cellStyle}">${q.question_text}</td>
                      <td style="${cellStyle} text-align: center; font-weight: bold;">${q.marks}</td>
                    </tr>
                  `).join('')
            : section.modules.map((mod, mIdx) => `
                    <!-- Option 1 -->
                    <tr>
                      <td style="${cellStyle} text-align: center; font-weight: bold;">${String.fromCharCode(65 + (mIdx * 2))}</td>
                      <td style="${cellStyle}">
                        ${mod.option1.map((sq, sqIdx) => `
                          <div style="display: flex; margin-bottom: 4px;">
                            <span style="font-weight: bold; margin-right: 5px;">${String.fromCharCode(97 + sqIdx)})</span>
                            <span>${sq.question_text}</span>
                            <span style="margin-left: auto; font-weight: bold; float: right;">${sq.marks}</span>
                          </div>
                        `).join('')}
                      </td>
                      <td style="${cellStyle} text-align: center; font-weight: bold;">
                        ${mod.option1.reduce((a, b) => a + (parseInt(b.marks) || 0), 0)}
                      </td>
                    </tr>
                    <!-- OR -->
                    <tr>
                      <td colspan="3" style="${cellStyle} text-align: center; font-weight: bold; background-color: #f0f0f0;">OR</td>
                    </tr>
                    <!-- Option 2 -->
                    <tr>
                      <td style="${cellStyle} text-align: center; font-weight: bold;">${String.fromCharCode(66 + (mIdx * 2))}</td>
                      <td style="${cellStyle}">
                        ${mod.option2.map((sq, sqIdx) => `
                          <div style="display: flex; margin-bottom: 4px;">
                            <span style="font-weight: bold; margin-right: 5px;">${String.fromCharCode(97 + sqIdx)})</span>
                            <span>${sq.question_text}</span>
                            <span style="margin-left: auto; font-weight: bold; float: right;">${sq.marks}</span>
                          </div>
                        `).join('')}
                      </td>
                      <td style="${cellStyle} text-align: center; font-weight: bold;">
                         ${mod.option2.reduce((a, b) => a + (parseInt(b.marks) || 0), 0)}
                      </td>
                    </tr>
                  `).join('')
          }
              </tbody>
            </table>
          </div>
        `).join('');

        return `
          <div style="font-family: 'Times New Roman', serif; color: #000000; padding: 20px; background: white;">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: bold; margin-bottom: 10px;">
              <div></div>
              <div>QP CODE : BT0325MATCRMN</div>
              <div>Total Pages: 03</div>
            </div>

            <div style="border: 1px solid #666; margin-bottom: 20px;">
              <div style="text-align: center; border-bottom: 1px solid #666; padding: 5px;">
                <div style="font-size: 16px; font-weight: bold;">NEHRU COLLEGE OF ENGINEERING AND RESEARCH CENTRE</div>
                <div style="font-size: 10px; font-weight: bold;">(AN AUTONOMOUS INSTITUTION)</div>
              </div>
              <div style="text-align: center; border-bottom: 1px solid #666; padding: 5px; font-weight: bold; font-size: 14px;">
                BTech Degree S3 (Regular) Examination October 2025
              </div>
              <div style="text-align: center; border-bottom: 1px solid #666; padding: 5px; font-weight: bold; font-size: 14px;">
                Course Code : 24CSMAT301/24AMMAT301
              </div>
              <div style="text-align: center; border-bottom: 1px solid #666; padding: 5px; font-weight: bold; font-size: 14px; text-transform: uppercase;">
                Course Name : ${selectedSubject || 'MATHEMATICS'}
              </div>
              <div style="display: flex; font-size: 14px; font-weight: bold;">
                <div style="flex: 1; padding: 5px; border-right: 1px solid #666;">Max. Marks: 60</div>
                <div style="flex: 1; padding: 5px; text-align: right;">Duration: 2½ Hrs</div>
              </div>
            </div>

            <!-- Content -->
            ${renderSections()}

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; font-size: 12px; border-top: 1px solid #ccc; padding-top: 10px;">
              <div style="font-weight: bold; margin-bottom: 5px;">****</div>
              <div>Page 1 of 03</div>
            </div>
          </div>
        `;
      };

      // 2. Create Render Container
      container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '794px'; // Exact A4 width
      container.style.zIndex = '-9999';
      container.style.background = 'white';

      // Inject Raw HTML
      container.innerHTML = getPageHTML();
      document.body.appendChild(container);

      // 3. Render PDF
      // Wait slightly for any fonts/images
      await new Promise(resolve => setTimeout(resolve, 500));

      const opt = {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: `${selectedSubject ? selectedSubject.replace(/\s+/g, '_') : 'Question_Paper'}_Institutional_QP.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          windowWidth: 794 // Match container
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(container).save();

    } catch (err) {
      console.error('PDF generation error:', err);
      alert(`PDF Download Failed: ${err.message}.`);
    } finally {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
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
