'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterData {
  company: {
    name: string;
    description: string;
    developedBy: {
      text: string;
      link: {
        name: string;
        url: string;
      };
    };
  };
  sections: {
    title: string;
    links: string[];
  }[];
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    fetch('/data/footerData.json')
      .then((res) => res.json())
      .then(setFooterData);
  }, []);

  if (!footerData) return null;

  return (
    <footer className="bg-green-900 text-white pt-12 pb-10 ">
      <div className=" md:px-25 px-4 flex flex-col md:flex-row md:justify-between md:gap-60  ">
        {/* Company Info */}
        <div className="md:w-1/2 ">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/connectfooter.png"
              alt="ConnectMore Logo"
              width={200}
              height={100}
            />
          </div>
          <p className="text-sm text-white/90  font-semibold mb-6">
            {footerData.company.description}
          </p>
          
        </div>

        {/* All Navigation Sections */}
        <div className="flex justify-around   sm:flex-row  md:w-1/2 ">
        
          {footerData.sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-3 text-white">{section.title}</h4>
              <ul className="space-y-2 text-white/80 text-base font-semibold ">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="text-lg px-4 md:px-25 font-semibold text-white/70 pt-10 md:pt-5">
            {footerData.company.developedBy.text}{' '}
            <a
              href={footerData.company.developedBy.link.url}
              className="underline hover:text-white"
            >
              {footerData.company.developedBy.link.name}
            </a>
          </p>
    </footer>
  );
};

export default Footer;
