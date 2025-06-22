'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IntegrationPoint {
  title: string;
  description: string;
}

interface IntegrationData {
  tag: string;
  title: string;
  description: string;
  points: IntegrationPoint[];
  image: string;
}

interface IntegrationSectionProps {
  dataPath: string;
}

interface CardColor {
  bg: string;
  tag: string;
  tick: string;
}

const FeaturesAltCardSec = ({ dataPath }: IntegrationSectionProps) => {
  const [dataArray, setDataArray] = useState<IntegrationData[]>([]);

  const colors: CardColor[] = [
     
    { bg: 'bg-[#D6FFE7] text-[#00431F]', tag: 'bg-[#00622D] text-[#D6FFE7]', tick: 'text-green-600' }, // Color A
    { bg: 'bg-[#00431F] text-[#D6FFE7]', tag: 'bg-[#D6FFE7] text-[#00431F]', tick: 'text-green-600' }, // Color B
  ];

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.json())
      .then((json: IntegrationData[]) => setDataArray(json))
      .catch((err) => console.error('Failed to fetch integrations data:', err));
  }, [dataPath]);

  if (dataArray.length === 0) return null;

  return (
    <section className="py-16 px-4 text-[#00391E]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {dataArray.map((data, index) => {
          // Row number = Math.floor(index / 2)
          // Col number = index % 2 (0 = left, 1 = right)
          const row = Math.floor(index / 2);
          const col = index % 2;
          const color = colors[(row + col) % 2]; // ✅ Checkerboard color pattern
          return (
            <div key={index} className={`rounded-md overflow-hidden flex flex-col ${color.bg}`}>
              <div className="p-8 space-y-4 flex-1">
                <span className={`inline-block text-sm font-medium px-3 py-1 rounded ${color.tag}`}>
                  {data.tag}
                </span>
                <h2 className="text-2xl font-bold">{data.title}</h2>
                <p className="text-[16px] opacity-90">{data.description}</p>
                <ul className="space-y-2 text-[16px]">
                  {data.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`text-lg font-bold ${color.tick}`}>✓</span>
                      <div>
                        <strong>{point.title}:</strong> {point.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full z-0 px-8">
                <Image
                  src={data.image}
                  alt="Feature Graphic"
                  width={1200}
                  height={500}
                  className="w-full object-cover "
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesAltCardSec;
