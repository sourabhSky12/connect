
import TopSectionPages from "@/component/organisms/TopSectionPages"
import { NextPage } from "next"
import IntegrationSection from "@/component/organisms/IntegrationSection";
import FeaturesAltCardSec from "@/component/organisms/FeaturesAltCardSec";


const index : NextPage  = () => {
return (<>
<TopSectionPages jsonPath="/data/featurestopsec.json" />
<FeaturesAltCardSec dataPath="/data/FeaturesAltCard.json"/>
 <IntegrationSection dataPath="/data/integrations.json"/>
</>)
}
export default index