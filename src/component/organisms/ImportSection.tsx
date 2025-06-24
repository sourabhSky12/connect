'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface StepItem {
  type: 'step';
  step: string;
  title: string;
  description: string;
  buttonText: string;
  url: string; 
}

interface ImageItem {
  type: 'image';
  src: string;
  alt: string;
}

interface RowItem {
  left: StepItem | ImageItem;
  right: StepItem | ImageItem;
}

const ImportSection = () => {
  const [rows, setRows] = useState<RowItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/importRows.json')
      .then((res) => res.json())
      .then((data) => setRows(data.rows));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !dotRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const dotHeight = dotRef.current.offsetHeight;

      const scrollY = window.scrollY + window.innerHeight / 2;
      let relativeY = scrollY - sectionTop;

      // Start and end offsets
      const startOffset = 200;
      const endOffset = 200;

      relativeY = Math.max(startOffset, Math.min(relativeY, sectionHeight - dotHeight - endOffset));

      dotRef.current.style.transform = `translateY(${relativeY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6 md:px-20 bg-white overflow-hidden">
      {/* Green vertical line with start & end offset */}
    <div
  className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-0"
  style={{
    top: '200px',
    height: 'calc(100% - 400px)',
    borderLeft: '3px dotted #4ade80', // green-400 with wider spacing
    background: 'none',
  }}
/>



      {/* Animated dot */}
      <div
        ref={dotRef}
        className="hidden lg:flex w-25 h-25 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center  absolute left-1/2 transform -translate-x-1/2 z-10"
        style={{ top: 0 }}
      >
        <Image src="/titl-arrow.png" alt="Connector Icon" width={30} height={30} />
      </div>

      {/* Timeline rows */}
      <div className="space-y-32 relative z-10">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center justify-between gap-6 relative"
          >
            {/* Left */}
            <div className="w-full lg:w-5/12 flex justify-center z-10">
              {row.left.type === 'step' ? (
                <div className="text-center lg:text-left max-w-md">
                  <span className="text-green-600 font-semibold text-sm mb-2 inline-block bg-green-100 px-3 py-1 rounded-full">
                    {(row.left as StepItem).step}
                  </span>
                  <h2 className="text-2xl font-bold mb-4">{(row.left as StepItem).title}</h2>
                  <p className="text-gray-700 mb-4">{(row.left as StepItem).description}</p>
                 <Link
  href={(row.left as StepItem).url}
  className="inline-block bg-green-700 text-white px-5 py-2 rounded cursor-pointer hover:bg-green-800 transition"
>
  {(row.left as StepItem).buttonText}
</Link>
                </div>
              ) : (
                <Image
                  src={(row.left as ImageItem).src}
                  alt={(row.left as ImageItem).alt}
                  width={500}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              )}
            </div>

            {/* Spacer for center */}
            <div className="hidden lg:flex w-[60px] justify-center" />

            {/* Right */}
            <div className="w-full lg:w-5/12 flex justify-center z-10">
              {row.right.type === 'step' ? (
                <div className="text-center lg:text-left max-w-md">
                  <span className="text-green-600 font-semibold text-sm mb-2 inline-block bg-green-100 px-3 py-1 rounded-full">
                    {(row.right as StepItem).step}
                  </span>
                  <h2 className="text-2xl font-bold mb-4">{(row.right as StepItem).title}</h2>
                  <p className="text-gray-700 mb-4">{(row.right as StepItem).description}</p>
                <Link
  href={(row.right as StepItem).url}
  className="inline-block bg-green-700 text-white px-5 py-2 rounded cursor-pointer hover:bg-green-800 transition"
>
  {(row.right as StepItem).buttonText}
</Link>
                </div>
              ) : (
                <Image
                  src={(row.right as ImageItem).src}
                  alt={(row.right as ImageItem).alt}
                  width={500}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImportSection;
