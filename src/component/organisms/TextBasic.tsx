'use client';
import { useEffect, useState } from 'react';

type SubSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: SubSection[];
};

type TextBasicData = {
  title: string;
  sections: Section[];
};

type TextBasicProps = {
  jsonPath: string; // Example: "/data/basicData.json"
};

const TextBasic = ({ jsonPath }: TextBasicProps) => {
  const [data, setData] = useState<TextBasicData | null>(null);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const text = await res.text();
      if (!text) throw new Error("Empty response body");
      const json = JSON.parse(text);
      setData(json);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to fetch or parse JSON:", err.message);
        setError("Failed to load content.");
      } else {
        console.error("Unknown error:", err);
        setError("An unknown error occurred.");
      }
    }
  };

  fetchData();
}, [jsonPath]);


  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 space-y-10 pb-10">
      <h1 className="text-3xl font-bold">{data.title}</h1>

      {data.sections.map((sec, idx) => (
        <div key={idx} className="space-y-4">
          <h2 className="text-2xl font-semibold">{sec.heading}</h2>

          {sec.paragraphs?.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
          ))}

          {sec.list && (
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {sec.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {sec.subsections?.map((sub, j) => (
            <div key={j} className="ml-4 space-y-2  pl-4 border-gray-300">
              {sub.heading && (
                <h3 className="text-xl font-semibold text-gray-900">{sub.heading}</h3>
              )}
              {sub.paragraphs.map((sp, k) => (
                <p key={k} className="text-gray-700">{sp}</p>
              ))}
              {sub.list && (
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {sub.list.map((li, l) => (
                    <li key={l}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TextBasic;
