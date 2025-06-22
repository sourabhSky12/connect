'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CardData {
  type: string;
  quote: string;
  content: string;
}

interface VisionMissionData {
  title: string;
  cards: CardData[];
}

interface VisionMissionSectionProps {
  dataPath: string;
}

const VisionMissionSection = ({ dataPath }: VisionMissionSectionProps) => {
  const [data, setData] = useState<VisionMissionData | null>(null);

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) =>
        console.error('Failed to fetch vision/mission data:', err)
      );
  }, [dataPath]);

  if (!data) return null;

  return (
    <section className="relative bg-[#00391E] text-white py-16 md:py-20 px-4 lg:px-24 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/bodyicon.png')] bg-repeat opacity-10"
        style={{ backgroundSize: '40px 40px' }}
        aria-hidden="true"
      />

      {/* Decorative Triangle Image */}
      <Image
        src="/top-arrow.png"
        alt="decorative triangle"
        width={400}
        height={300}
        className="absolute hidden lg:block top-[10%] right-[-10px] opacity-30 z-0 pointer-events-none select-none px-4"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl lg:text-[40px] font-semibold mb-12 whitespace-pre-line md:text-start">
          {data.title.split(',')[0]},
          <br className="lg:hidden" /> {data.title.split(',')[1]}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#C1FAD7] text-black rounded-lg shadow-md p-10 text-left"
            >
              <h3 className="text-[42px] font-semibold mb-5">{card.type}</h3>
              <p className="italic font-medium mb-4 text-[#00391E] text-[17px]">
                {card.quote}
              </p>
              <hr className="border-green-300 mb-5" />
              <p className="text-[15px] leading-relaxed">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
