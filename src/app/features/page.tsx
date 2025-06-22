
import TopSectionPages from "@/component/organisms/TopSectionPages"
import { NextPage } from "next"
import IntegrationSection from "@/component/organisms/IntegrationSection";


const index : NextPage  = () => {
return (<>
<TopSectionPages jsonPath="/data/featurestopsec.json" />
 <IntegrationSection dataPath="/data/integrations.json"/>
</>)
}
export default index