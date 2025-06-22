import AloneTextSec from "@/component/molecules/AloneTextSec";
import FeatureCardGrid from "@/component/molecules/FeatureCardGrid";



import Footer from "@/component/organisms/Footer";
import HeroDashboard from "@/component/organisms/HeroDashboard";
import HomeGreenSec from "@/component/organisms/HomeGreenSec";
import HomeTopSec from "@/component/organisms/HomeTopSec";
import ImportSection from "@/component/organisms/ImportSection";

import Navbar from "@/component/organisms/Navbar";



export default function Home() {
  return (
    <main className="min-h-screen bg-white ">
      <Navbar/>
      <HomeTopSec/>
      
      <HomeGreenSec dataPath="/data/homeGreenData.json"/>
      <FeatureCardGrid dataPath="/data/features.json" />
       <ImportSection/>
      <AloneTextSec/>
      <HeroDashboard/>
     
      
      <Footer/>
    </main>
  );
}
