// Section Component
// Professional exam-style section display (PART A, PART B, etc.)
// Questions are randomly fetched and displayed here

import QuestionItem from './QuestionItem';

export default function Section({ sectionName, questions, startQuestionNumber, totalMarks, sectionIndex }) {
  // Convert "Section A" to "PART A" format
  const partName = sectionName.replace('Section', 'PART');
  
  // Determine instructions based on section
  // Section A (index 0): Answer all questions
  // Section B (index 1): Answer any X questions
  // Section C (index 2): Answer any X questions with conditions
  
  let instructions = '';
  if (sectionIndex === 0) {
    instructions = `Answer all questions. Each question carries ${questions[0]?.marks || 0} marks`;
  } else if (sectionIndex === 1) {
    instructions = `Answer any ${Math.ceil(questions.length * 0.5)} full questions. Each question carries ${questions[0]?.marks || 0} marks`;
  } else {
    instructions = `Answer any ${Math.ceil(questions.length * 0.4)} full questions with minimum one question from each Module. Each question carries ${questions[0]?.marks || 0} marks`;
  }

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold uppercase mb-2">
          {partName}:
        </h2>
        <p className="text-sm font-semibold italic mb-3">
          {instructions}
        </p>
      </div>

      {/* Questions List - Randomly fetched from database */}
      <div className="space-y-4 ml-4">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionItem
              key={question.id}
              questionNumber={startQuestionNumber + index}
              questionText={question.question_text}
              marks={question.marks}
            />
          ))
        ) : (
          <p className="text-gray-500 italic py-4 text-center">
            No questions available for this section.
          </p>
        )}
      </div>
    </div>
  );
}
