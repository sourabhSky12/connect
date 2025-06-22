

import FeatureCardGrid from "@/component/molecules/FeatureCardGrid"
import TeamAboutSec from "@/component/molecules/TeamAboutSec"
import TopSectionPages from "@/component/organisms/TopSectionPages"
import VisionMissionSection from "@/component/organisms/VisionMissionSection"
import { NextPage } from "next"



const index : NextPage  = () => {
return (
<>
<TopSectionPages jsonPath="/data/abouttopsec.json"/>
<FeatureCardGrid 
 dataPath="/data/aboutCardData.json"
 gridClassName="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
  />
  <TeamAboutSec dataPath="/data/aboutTeamSecData.json"/>
   <VisionMissionSection dataPath="/data/vision-mission.json"/>
</>
)
}
export default index