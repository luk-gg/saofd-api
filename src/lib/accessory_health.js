import DT_OrnamentBaseStatusData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentBaseStatusData.json"
import { RCIM_Linear } from "./utils"

const DT_OrnamentBaseStatusData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_OrnamentBaseStatusData*", { eager: true, import: "default" })
const OrnamentBaseStatusData = Object.values(DT_OrnamentBaseStatusData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(OrnamentBaseStatusData)
    .reduce((acc, [accId, accessory]) => {
        // To save space, omit the x value (accessory rank) and only return the y value (attack %). Use the index to calculate rank on the front end. 
        acc[accId] = RCIM_Linear(accessory.Keys).map(coords => coords.y)
        return acc
    }, {})