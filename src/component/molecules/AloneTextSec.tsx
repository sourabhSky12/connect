'use client';
import DynamicModalForm from "../organisms/DynamicModalForm";
import TextSection from "./TextSection"
import {useEffect, useState } from "react";
interface HeroData {
  title: string;
  description?: string;
 
}
const AloneTextSec = () =>{
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    
      useEffect(() => {
        fetch('/data/alonetextsecData.json')
          .then((res) => res.json())
          .then(setHeroData);
      }, []);
    
      if (!heroData) return null;
    return(
        <>
        <section>
         <div className="px-4 md:px-28 py-5 md:py-15">
         <h5>How ConnectMore Works</h5>
         <TextSection
          title={heroData.title}
          description={heroData.description}
          
        />
        <div className="pt-5">
         <DynamicModalForm buttonClassName="bg-green-600 hover:bg-green-700  text-white  text-[15px] font-medium py-6 cursor-pointer px-12 rounded-xs transition" />
         </div>
        </div>
        </section>
        </>
    )
}
export default AloneTextSec