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

const IntegrationSection = ({ dataPath }: IntegrationSectionProps) => {
  const [data, setData] = useState<IntegrationData | null>(null);

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch integrations data:', err));
  }, [dataPath]);

  if (!data) return null;

  return (
    <section className="relative py-16 px-4   text-[#00391E]">
      <div className='lg:mx-28 bg-green-100'>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 items-center p-12 ">
        {/* Left Text */}
        <div>
          <span className="inline-block bg-green-800 text-white text-sm font-medium px-3 py-1 rounded mb-4">
            {data.tag}
          </span>
          <h2 className="text-3xl lg:text-[26px] font-bold mb-6 leading-tight">{data.title}</h2>
          <p className="text-[16] mb-6 opacity-80">{data.description}</p>
          <ul className="space-y-4 text-[16]">
            {data.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 text-lg font-bold">✓</span>
                <div>
                  <strong>{point.title}:</strong> {point.description}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center items-center">
          <Image
            src={data.image}
            alt="Integrations Graphic"
            width={500}
            height={500}
            className="w-full md:pl-10 max-w-[500px] lg:max-w-[500px]"
          />
        </div>
      </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
