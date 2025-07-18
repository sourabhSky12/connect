

import FeatureCardGrid from "@/component/molecules/FeatureCardGrid"
import TopSectionPages from "@/component/organisms/TopSectionPages"
import { NextPage } from "next"



const index : NextPage  = () => {
return (
<>
<TopSectionPages jsonPath="/data/pricingtopsec.json"/>
<FeatureCardGrid
 dataPath="/data/pricingCardData.json"
 headerTitle="Included Features"
 gridClassName="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
/>
</>
)
}
export default index