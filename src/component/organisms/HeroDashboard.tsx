'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import TextSection from '../molecules/TextSection';

interface HeroData {
  title: string;
  description?: string;
  button?: {
    text: string;
    href: string;
  };
  note?: string;
}

const HeroDashboard = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch('/data/heroSectionData.json')
      .then((res) => res.json())
      .then(setHeroData);
  }, []);

  if (!heroData) return null;

  return (
    <section className="bg-white pt-15">
      <div className="md:mx-25 px-3  flex flex-col md:flex-row  gap-10 ">
        <div className='flex-2/5'>
        <TextSection
          title={heroData.title}
          description={heroData.description}
          button={heroData.button}
          note={heroData.note}
        />
        </div>
        <div className="flex-3/5">
          <Image
            src="/dashboardimg.png"
            alt="Dashboard"
            width={1000}
            height={1000}
            className=" w-full h-auto "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroDashboard;