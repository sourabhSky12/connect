'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AboutData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

interface AboutSectionProps {
  dataPath: string;
}

const TeamAboutSec = ({ dataPath }: AboutSectionProps) => {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch about data:', err));
  }, [dataPath]);

  if (!data) return null;

  return (
    <section className="pt-16 px-4 md:pl-28 bg-white">
  <div className="flex flex-col-reverse md:grid md:[grid-template-columns:1fr_1.3fr] items-center gap-10 md:gap-25">
    {/* Text Side */}
    <div className='md:pr-15'>
      <h2 className="text-[24px] font-semibold text-[#020318] mb-6">{data.title}</h2>
      <p className="text-[#020318] text-[14px] mb-6">{data.description}</p>
      <Link href={data.buttonLink}>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded">
          {data.buttonText}
        </button>
      </Link>
    </div>

    {/* Image Side */}
    <div className="w-full flex justify-center items-center">
      <Image
        src={data.image}
        alt="Team Image"
        width={800}
        height={500}
        className="object-cover  w-full max-w-[850px] h-auto md:h-[500px] lg:h-[600px]"
      />
    </div>
  </div>
</section>

  );
};

export default TeamAboutSec;
