// QuestionItem Component
// Professional exam-style question display
// Questions are randomly fetched from database and displayed here

export default function QuestionItem({ questionNumber, questionText, marks }) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 items-start">
        {/* Question Number */}
        <div className="flex-shrink-0 mt-1">
          <span className="font-bold text-base">
            {questionNumber}.
          </span>
        </div>
        
        {/* Question Text */}
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-black mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
            {questionText}
          </p>
        </div>
      </div>
    </div>
  );
}
