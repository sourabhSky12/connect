'use client';


import DynamicModalForm from "../organisms/DynamicModalForm";

interface TextSectionProps {
  title: string;
  description?: string;
  
  button?: {
    text: string;
    href: string;
  };
  note?: string;
}

const TextSection = ({ title, description, button, note, }: TextSectionProps) => {
  return (
    <div className="space-y-6">
     
      <h1 className="text-4xl font-semibold text-gray-900 whitespace-pre-line ">{title}</h1>
      {description && <p className="text-gray-700 text-lg ">{description}</p>}
      {button && (
      <DynamicModalForm buttonClassName="bg-green-600 hover:bg-green-700  text-white  text-[15px] font-medium py-6 cursor-pointer px-12 rounded-xs transition" />

      )}
      
        
        
      {note && (
  <div className="flex items-center gap-2 text-black text-sm">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.999 7.999a1 1 0 01-1.414 0L3.293 10.293a1 1 0 011.414-1.414L8 12.172l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
    <span>{note}</span>
  </div>
)}

      
    </div>
  );
};

export default TextSection;
