'use client';

import Link from 'next/link';

interface DynamicButtonProps {
  text: string;
  href: string;
  onClick?: () => void;
  className?: string;
}

const DynamicButton = ({ text, href, onClick, className }: DynamicButtonProps) => {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={className || "bg-green-600 hover:bg-green-700 text-white text-[15px] font-medium py-3 px-6 rounded transition"}
      >
        {text}
      </button>
    </Link>
  );
};


export default DynamicButton;
