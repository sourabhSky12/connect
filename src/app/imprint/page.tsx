
import TextBasic from "@/component/organisms/TextBasic"
import { NextPage } from "next"



const index : NextPage  = () => {
return (
<>
<TextBasic jsonPath="/data/imprintData.json"/>
</>
)
}
export default index