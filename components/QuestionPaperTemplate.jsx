// QuestionPaperTemplate Component
// Matches the specific institutional format provided in images
'use client';

import React from 'react';

export default function QuestionPaperTemplate({
  courseName = 'MATHEMATICS III',
  sections = [],
  totalPaperMarks = 60,
  date = 'October 2025',
  time = '2½ Hrs',
  institutionName = 'NEHRU COLLEGE OF ENGINEERING AND RESEARCH CENTRE',
  courseCode = '24CSMAT301/24AMMAT301',
  examination = 'BTech Degree S3 (Regular) Examination',
  qpCode = 'BT0325MATCRMN',
  totalPages = '03',
}) {
  return (
    <div id="question-paper" className="bg-white p-4 max-w-[210mm] mx-auto print:p-0 text-black overflow-hidden" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      {/* Top Header Label */}
      <div className="flex justify-between items-center text-[10px] mb-4 uppercase font-bold border-b border-transparent">
        <div className="flex-1"></div>
        <div className="text-center flex-1">QP CODE : {qpCode}</div>
        <div className="text-right flex-1">Total Pages: {totalPages}</div>
      </div>

      {/* Main Institution Header Box */}
      <div className="border border-slate-400 mb-6 border-collapse">
        <div className="text-center py-2 px-4 border-b border-slate-400">
          <h1 className="text-base font-bold uppercase">{institutionName}</h1>
          <p className="text-[10px] font-bold mt-0.5">(AN AUTONOMOUS INSTITUTION)</p>
        </div>
        <div className="text-center py-1.5 px-4 border-b border-slate-400 bg-slate-50/20">
          <p className="text-sm font-bold uppercase">{examination} {date}</p>
        </div>
        <div className="text-center py-1.5 px-4 border-b border-slate-400">
          <p className="text-sm font-bold">Course Code : {courseCode}</p>
        </div>
        <div className="text-center py-1.5 px-4 border-b border-slate-400">
          <p className="text-sm font-bold uppercase">Course Name : {courseName}</p>
        </div>
        <div className="flex text-sm font-bold divide-x divide-slate-400">
          <div className="flex-1 py-1.5 px-4">Max. Marks: {totalPaperMarks}</div>
          <div className="flex-1 py-1.5 px-4 text-right">Duration: {time}</div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-6">
        {sections.map((section, sIndex) => (
          <div key={sIndex} className="w-full">
            {/* Section Header */}
            <div className="text-center mb-2">
              <h2 className="text-sm font-black uppercase border-y-2 border-slate-900 py-1">{section.sectionName}</h2>
              <p className="text-xs italic font-bold mt-1">{section.instructions}</p>
            </div>

            {/* Questions Table */}
            <table className="w-full border-collapse border border-slate-900 text-xs text-black">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="border border-slate-900 w-12 py-1 text-black">No</th>
                  <th className="border border-slate-900 py-1 text-left px-3 italic text-black">Questions</th>
                  <th className="border border-slate-900 w-20 py-1 text-black">Marks</th>
                </tr>
              </thead>
              <tbody>
                {section.type === 'partA' ? (
                  /* Part A - Continuous Questions */
                  section.questions.map((q, qIndex) => (
                    <tr key={q.id || qIndex}>
                      <td className="border border-slate-900 text-center py-1.5 align-top">{qIndex + 1}</td>
                      <td className="border border-slate-900 px-3 py-1.5 text-sm leading-relaxed">{q.question_text}</td>
                      <td className="border border-slate-900 text-center py-1.5 align-top font-bold">{q.marks}</td>
                    </tr>
                  ))
                ) : (
                  /* Part B - Internal Choice (OR) */
                  section.modules && section.modules.map((module, mIndex) => (
                    <React.Fragment key={mIndex}>
                      {/* Option 1 */}
                      <tr>
                        <td className="border border-slate-900 text-center py-2 align-top font-bold">
                          {String.fromCharCode(65 + (mIndex * 2))}
                        </td>
                        <td className="border border-slate-900 px-3 py-2">
                          {module.option1.map((sq, sqIndex) => (
                            <div key={sq.id || `sq1-${sqIndex}`} className="flex gap-2 mb-2 last:mb-0">
                              <span className="font-bold min-w-[20px]">{String.fromCharCode(97 + sqIndex)})</span>
                              <span className="text-sm leading-relaxed">{sq.question_text}</span>
                              <span className="ml-auto font-bold pl-4">{sq.marks}</span>
                            </div>
                          ))}
                        </td>
                        <td className="border border-slate-900 text-center py-2 align-top font-bold">
                          {module.option1.reduce((sum, sq) => sum + (parseInt(sq.marks) || 0), 0)}
                        </td>
                      </tr>
                      {/* OR Separator */}
                      <tr>
                        <td colSpan="3" className="border border-slate-900 text-center py-1 font-black bg-slate-50/30">OR</td>
                      </tr>
                      {/* Option 2 */}
                      <tr>
                        <td className="border border-slate-900 text-center py-2 align-top font-bold">
                          {String.fromCharCode(66 + (mIndex * 2))}
                        </td>
                        <td className="border border-slate-900 px-3 py-2">
                          {module.option2.map((sq, sqIndex) => (
                            <div key={sq.id || `sq2-${sqIndex}`} className="flex gap-2 mb-2 last:mb-0">
                              <span className="font-bold min-w-[20px]">{String.fromCharCode(97 + sqIndex)})</span>
                              <span className="text-sm leading-relaxed">{sq.question_text}</span>
                              <span className="ml-auto font-bold pl-4">{sq.marks}</span>
                            </div>
                          ))}
                        </td>
                        <td className="border border-slate-900 text-center py-2 align-top font-bold">
                          {module.option2.reduce((sum, sq) => sum + (parseInt(sq.marks) || 0), 0)}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Footer / Page Indicator */}
      <div className="mt-12 text-center text-xs border-t border-slate-300 pt-4">
        <p className="font-bold uppercase mb-2">****</p>
        <p>Page 1 of {totalPages}</p>
      </div>
    </div>
  );
}
