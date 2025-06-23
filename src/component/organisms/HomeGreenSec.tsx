'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';

interface CardPS {
  problem: string;
  solution: string;
}

interface StatItem {
  icon: string;
  number: number;
  label: string;
}

interface VisionMissionData {
  title: string;
  cards: CardPS[];
  stats: StatItem[];
}

interface VisionMissionSectionProps {
  dataPath: string;
}

const HomeGreenSec = ({ dataPath }: VisionMissionSectionProps) => {
  const [data, setData] = useState<VisionMissionData | null>(null);

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch data:', err));
  }, [dataPath]);

  if (!data) return null;

  return (
    <section className="relative bg-[#00391E] text-white py-16 px-4 lg:px-24 overflow-hidden ">
      {/* Decorative Background */}
      <div
        className="absolute inset-0 bg-[url('/bodyicon.png')] bg-repeat opacity-10"
        style={{ backgroundSize: '40px 40px' }}
      />
      <Image
        src="/top-arrow.png"
        alt="decorative triangle"
        width={400}
        height={300}
        className="absolute  lg:block top-[10%] right-[-10px] opacity-30 z-0 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center md:text-start">
        <h2 className="text-[40px]  font-semibold mb-8 whitespace-pre-line">
          {data.title}
        </h2>

        {/* Stats Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {data.stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              problem={data.cards[index]?.problem}
              solution={data.cards[index]?.solution}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  number,
  label,
  problem,
  solution,
}: {
  number: number;
  label: string;
  problem: string;
  solution: string;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, number, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, [number, count]);

  // ✅ Correctly update React state from MotionValue
  useMotionValueEvent(rounded, 'change', (latest) => {
    setDisplayValue(latest);
  });

  return (
    <div className="bg-[#D6FFE7] border text-[#00431F] border-green-500/30  p-12 text-left relative overflow-hidden shadow-lg backdrop-blur-sm">
     <div className="text-4xl font-bold  mb-2">
  <span className="text-[#00431F]">+</span>{displayValue}
  {label.includes('%') && '%'}
  {label.includes('h') && 'h'}
</div>

      <div className="text-xl font-medium  mb-4">
        {label.replace('+', '').replace(/\d+(%|h)?/, '').trim()}
      </div>

      <div className="border-t border-green-400/20 pt-3 text-sm ">
        <div className="font-semibold mb-1">Problem</div>
        <div className="mb-3 opacity-90">{problem}</div>
        <div className="font-semibold mb-1">Solution</div>
        <div className="opacity-90">{solution}</div>
      </div>
    </div>
  );
};

export default HomeGreenSec;
