
import TopSectionPages from "@/component/organisms/TopSectionPages"
import { NextPage } from "next"
import IntegrationSection from "@/component/organisms/IntegrationSection";
import FeaturesAltCardSec from "@/component/organisms/FeaturesAltCardSec";
import HeroDashboard from "@/component/organisms/HeroDashboard";
import DynamicModalForm from "@/component/organisms/DynamicModalForm";

const index : NextPage  = () => {
return (<>
<TopSectionPages jsonPath="/data/featurestopsec.json"
customButton={<DynamicModalForm />

} />
<FeaturesAltCardSec dataPath="/data/FeaturesAltCard.json"/>
 <IntegrationSection dataPath="/data/integrations.json"/>
 <HeroDashboard/>
</>)
}
export default index