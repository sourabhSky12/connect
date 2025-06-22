'use client';

import { useEffect, useState } from 'react';
import { Check, Send } from 'lucide-react';
import DynamicModalForm from './DynamicModalForm';
import DynamicButton from '../atoms/DynamicButton';

interface HomeTopSecData {
  headline: string;
  highlight: string;
  subheadline: string;
  description: string;
  footerNote: string;
}

export default function HomeTopSec() {
  const [data, setData] = useState<HomeTopSecData | null>(null);

  useEffect(() => {
    fetch('/data/hometopsec.json')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to load hero data:', err));
  }, []);

  if (!data) return null;

  return (
    <section className="bg-white text-center py-16 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <h1 className="text-[32px] md:text-[42px] font-medium text-[#020318]">
          {data.headline}
        </h1>

        <span className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm mt-3 md:mt-0">
          <Send className="w-6 h-6 md:w-7 md:h-7 mr-2 text-[#00431F]" />
          <span className="text-[#00431F] text-[32px] md:text-[42px] font-semibold">
            {data.highlight}
          </span>
        </span>
      </div>

      <p className="mt-4 text-[28px] md:text-[42px] font-medium text-[#020318] md:mt-0">
        {data.subheadline}
      </p>

      <p className="mt-6 text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
        {data.description}
      </p>

      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <DynamicModalForm />

        <DynamicButton
          text="Check Out Features"
          href="/features"
          className="bg-[#D6FFE7] hover:bg-[#95FFC0] border cursor-pointer border-[#D6FFE7] text-[#00431F] text-[15px] font-medium py-3 px-6 rounded transition"
        />
      </div>

      <div className="mt-6 flex justify-center items-center text-gray-700 text-sm">
        <Check className="w-4 h-4 text-green-600 mr-2" />
        <span className="font-bold text-black">{data.footerNote}</span>
      </div>
      
    </section>
  );
}
