'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  imageUrl: string;
  children: ReactNode;
}

const StickyImageScrollOver = ({ imageUrl, children }: Props) => {
  return (
    <div className="relative bg-white">
      {/* Sticky Center Image */}
      <div className="sticky top-0 z-0 flex justify-center">
        <div className="w-[250px] sm:w-[350px] md:w-[600px] lg:w-[800px]">
          <Image
            src={imageUrl}
            alt="Sticky Image"
            width={750}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative  -mt-[150px] sm:-mt-[200px] md:-mt-[250px] lg:-mt-[300px] pt-[150px] sm:pt-[200px] md:pt-[300px] lg:pt-[300px]">
        {children}
      </div>
    </div>
  );
};

export default StickyImageScrollOver;
