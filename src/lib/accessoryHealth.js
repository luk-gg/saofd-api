import DT_OrnamentBaseStatusData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentBaseStatusData.json"
import { RCIM_Linear } from "./utils"

export default Object.entries(DT_OrnamentBaseStatusData[0].Rows)
    .reduce((acc, [accId, accessory]) => {
        // To save space, omit the x value (accessory rank) and only return the y value (attack %). Use the index to calculate rank on the front end. 
        acc[accId] = RCIM_Linear(accessory.Keys).map(coords => coords.y)
        return acc
    }, {})