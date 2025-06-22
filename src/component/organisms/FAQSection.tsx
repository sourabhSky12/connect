'use client';

import { useEffect, useState } from 'react';
import FAQItem from '../molecules/FAQItem';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/data/faqs.json')
      .then((res) => res.json())
      .then(setFaqs)
      .catch((err) => console.error('Failed to fetch FAQs:', err));
  }, []);

  return (
    <section className="w-full py-20 bg-[#D6FFE7]">
      <h2 className="text-2xl font-semibold text-center text-black mb-10">
        Your Questions, Answered
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="w-[90%] max-w-3xl bg-white text-left shadow-md ">
            <FAQItem
              {...faq}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
