import DT_WeaponBaseStatusData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponBaseStatusData.json"
import { RCIM_Linear } from "./utils"

export default Object.entries(DT_WeaponBaseStatusData[0].Rows)
    .reduce((acc, [wepId, weapon]) => {
        // To save space, omit the x value (weapon rank) and only return the y value (attack %). Use the index to calculate rank on the front end. 
        acc[wepId] = RCIM_Linear(weapon.Keys).map(coords => coords.y)
        return acc
    }, {})