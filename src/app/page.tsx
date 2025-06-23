import AloneTextSec from "@/component/molecules/AloneTextSec";
import FeatureCardGrid from "@/component/molecules/FeatureCardGrid";


import HeroDashboard from "@/component/organisms/HeroDashboard";
import HomeGreenSec from "@/component/organisms/HomeGreenSec";
import HomeTopSec from "@/component/organisms/HomeTopSec";
import ImportSection from "@/component/organisms/ImportSection";
import StickyImageContainer from "@/component/organisms/StickyImageContainer";


export default function Home() {
  return (
    <main className="min-h-screen bg-white ">
      
      <HomeTopSec />
      <StickyImageContainer imageUrl="/dashboard-home.png">
     <FeatureCardGrid dataPath="/data/features.json" /> 
    </StickyImageContainer>
     
    
      <AloneTextSec />
      <ImportSection />
      
       <HomeGreenSec dataPath="/data/homeGreenData.json" />
      <HeroDashboard />

      
    </main>
  );
}
