interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer px-2 py-4  transition duration-150"
    >
      <div className="w-full flex items-start text-left space-x-3">
        {/* Icon on the left */}
        <span className="pt-1">
          {isOpen ? (
            <svg className="w-5 h-5 text-green-600 bg-[#D6FFE7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-green-600 bg-[#D6FFE7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          )}
        </span>

        {/* Question + answer */}
        <div className="flex-1">
          <span className="text-base font-medium text-gray-900">{question}</span>
          {isOpen && (
            <p className="mt-2 text-base text-gray-600 transition duration-200">
              {answer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
