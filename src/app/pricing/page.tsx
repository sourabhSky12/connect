

import FeatureCardGrid from "@/component/molecules/FeatureCardGrid"
import HeroDashboard from "@/component/organisms/HeroDashboard"
import TopSectionPages from "@/component/organisms/TopSectionPages"
import { NextPage } from "next"
import DynamicModalForm from "@/component/organisms/DynamicModalForm"


const index : NextPage  = () => {
return (
<>
<TopSectionPages jsonPath="/data/pricingtopsec.json"
  customButton={<DynamicModalForm />

}   
/>
<FeatureCardGrid
 dataPath="/data/pricingCardData.json"
 headerTitle="Included Features"
 gridClassName="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
/>
<HeroDashboard/>
</>
)
}
export default index