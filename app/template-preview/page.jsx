'use client';

import QuestionPaperTemplate from '@/components/QuestionPaperTemplate';

export default function TemplatePreviewPage() {
  // Sample data matching the exam paper format
  const sampleSections = [
    {
      sectionName: 'PART A',
      type: 'partA',
      instructions: 'Answer all questions. Each question carries 3 marks',
      questions: [
        { id: '1', question_text: 'Prove that any subset of size 6 from the set S=[1,2,3,.....9] must contain 2 elements whose sum is 10.', marks: 3 },
        { id: '2', question_text: 'Verify the validity of the following argument. "Lions are dangerous animals. There are lions. Therefore there are dangerous animals".', marks: 3 },
        { id: '3', question_text: 'Define Group. Give an example.', marks: 3 },
        { id: '4', question_text: 'If A and B be sets with |B|=2. If there are 1024 relations from A to B, what is |A| ?', marks: 3 },
        { id: '5', question_text: 'Maximize f(x, y) = x² + y² subject to g(x,y)=x+y-1=0.', marks: 3 },
        { id: '6', question_text: 'A hospital wants to create a nutritious diet for patients that meets certain nutritional requirements at the minimum cost.', marks: 3 },
        { id: '7', question_text: 'The mean and variance of a binomial random variable X are 16 and 8 respectively. Find P(X = 0).', marks: 3 },
        { id: '8', question_text: 'A random variable X has a Uniform distribution over (-4,4). Find P(|X| ≤ 2).', marks: 3 },
      ],
      totalMarks: 24,
    },
    {
      sectionName: 'PART B',
      type: 'partB',
      instructions: 'Answer any 4 full questions with minimum one question from each Module. Each question carries 9 marks',
      modules: [
        {
          moduleNumber: '1',
          option1: [
            { id: '9a', question_text: 'Establish the following argument by the method of proof by contradiction: p→(q∧r), r→s, ~(q∧s)⊢~p', marks: 5 },
            { id: '9b', question_text: 'Negate and simplify the statement: ∀x[p(x) ∧ ¬q(x)]', marks: 4 }
          ],
          option2: [
            { id: '10a', question_text: 'Define equivalence relation. Let X={1,2,3,4,5,6,7} and R={(x,y): (x-y) is divisible by 3}. Show that R is an equivalence relation.', marks: 5 },
            { id: '10b', question_text: 'Define an Abelian group and show that for an Abelian Group (a*b)⁻¹ = b⁻¹ * a⁻¹', marks: 4 }
          ]
        },
        {
          moduleNumber: '2',
          option1: [
            { id: '11a', question_text: 'Find the point p(x,y,z) on the plane 2x+y-z-5=0 that is closest to the origin.', marks: 9 }
          ],
          option2: [
            { id: '12a', question_text: 'Using graphical method maximize z = 3x + 5y subject to constraints.', marks: 9 }
          ]
        },
        {
          moduleNumber: '3',
          option1: [{ id: '13a', question_text: 'A random variable X has the following pmf. Find the value of k and variance.', marks: 9 }],
          option2: [{ id: '14a', question_text: 'In a Normal Distribution 7% of the item are under 35 and 89% are under 63.', marks: 9 }]
        },
        {
          moduleNumber: '4',
          option1: [{ id: '15a', question_text: 'Explain the properties of T-distribution.', marks: 9 }],
          option2: [{ id: '16a', question_text: 'Two independent samples of sizes 8 and 7 gave the following values.', marks: 9 }]
        }
      ],
      totalMarks: 36,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Question Paper Template Preview
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                This is the built-in template structure for question papers
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href="/generate"
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Generate Paper
              </a>
              <a
                href="/dashboard"
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            📄 Template Structure
          </h2>
          <div className="text-blue-800 space-y-2 text-sm">
            <p><strong>Fixed Template Features:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Professional header with title, subject, date, time, and total marks</li>
              <li>General instructions section</li>
              <li>Three sections (A, B, C) with fixed mark distribution</li>
              <li>Section A: 10 questions × 2 marks = 20 marks</li>
              <li>Section B: 5 questions × 5 marks = 25 marks</li>
              <li>Section C: 2 questions × 10 marks = 20 marks</li>
              <li>Questions are randomly fetched from database and displayed in this format</li>
              <li>Print-friendly layout for PDF download</li>
            </ul>
          </div>
        </div>

        {/* Template Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Template Preview (Sample Data)
            </h2>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🖨️ Print Preview
            </button>
          </div>

          <div className="border-2 border-dashed border-gray-300 p-4 bg-gray-50 rounded">
            <QuestionPaperTemplate
              paperTitle="Question Paper"
              courseName="MATHEMATICS III FOR CSE/MATHEMATICS III FOR AI & ML"
              subject=""
              sections={sampleSections}
              totalPaperMarks={60}
              date={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              time="2½ Hrs"
              institutionName="NEHRU COLLEGE OF ENGINEERING AND RESEARCH CENTRE"
              courseCode="24CSMAT301/24AMMAT301"
              examination="BTech Degree S3 (Regular) Examination October 2025"
              qpCode="BT0325MATCRMN"
              totalPages="03"
            />
          </div>
        </div>

        {/* Template Details */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Template Components
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Header Section</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Paper Title (centered, bold)</li>
                <li>Subject/Course Name</li>
                <li>Date, Time, Total Marks</li>
                <li>Professional border styling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Instructions</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>General instructions box</li>
                <li>Standard exam guidelines</li>
                <li>Blue accent border</li>
                <li>Clear, readable format</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Question Sections</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Section headers (A, B, C)</li>
                <li>Total marks per section</li>
                <li>Auto-numbered questions</li>
                <li>Marks displayed per question</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Question Display</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Bordered question boxes</li>
                <li>Question number (Q1, Q2, etc.)</li>
                <li>Question text with proper spacing</li>
                <li>Marks badge on the right</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            🔄 How Questions Are Fetched
          </h3>
          <ol className="text-green-800 space-y-2 list-decimal list-inside text-sm">
            <li>When you click "Generate Paper", the system fetches questions from your database</li>
            <li>Questions are filtered by marks (2, 5, or 10 marks) to match each section</li>
            <li>Questions are randomly shuffled to ensure different papers each time</li>
            <li>Required number of questions are selected for each section</li>
            <li>Selected questions are displayed in this fixed template format</li>
            <li>You can download the generated paper as PDF</li>
          </ol>
        </div>
      </main>
    </div>
  );
}

