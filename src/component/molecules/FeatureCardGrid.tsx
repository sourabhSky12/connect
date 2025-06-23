'use client';

import { useEffect, useState } from 'react';
import FeatureCard from '../atoms/FeatureCard';

interface Feature {
  title: string;
  description?: string;
  list?: string[];
}

interface FeatureCardGridProps {
  dataPath: string;
  gridClassName?: string;
  headerTitle?: string;
}

const FeatureCardGrid = ({ dataPath, gridClassName, headerTitle }: FeatureCardGridProps) => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error('Failed to fetch features:', err));
  }, [dataPath]);

  return (
    <section className="bg-white px-4 md:mx-25 my-5">
      {headerTitle && (
        <div className="text-center ">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {headerTitle}
          </h2>
        </div>
      )}

      <div className={gridClassName || 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'}>
        {features.map((feature, idx) => {
          const isEven = idx % 2 === 0;
          const bgColor = isEven
            ? 'bg-[#D6FFE7] text-[#00431F]'
            : 'bg-[#00431F] text-[#D6FFE7]';

          return (
            <div className="h-full" key={idx}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                list={feature.list}
                bgColor={bgColor}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureCardGrid;
