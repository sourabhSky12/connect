

import FAQSection from "@/component/organisms/FAQSection"
import TopSectionPages from "@/component/organisms/TopSectionPages"
import { NextPage } from "next"



const index : NextPage  = () => {
return (
<>
<TopSectionPages jsonPath="/data/supporttopsec.json"/>
<FAQSection/>
</>
)
}
export default index