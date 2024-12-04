import DT_WeaponBaseStatusData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponBaseStatusData.json"
import { RCIM_Linear } from "./utils"

const DT_WeaponBaseStatusData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_WeaponBaseStatusData*", { eager: true, import: "default" })
const WeaponBaseStatusData = Object.values(DT_WeaponBaseStatusData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(WeaponBaseStatusData)
    .reduce((acc, [wepId, weapon]) => {
        // To save space, omit the x value (weapon rank) and only return the y value (attack %). Use the index to calculate rank on the front end. 
        acc[wepId] = RCIM_Linear(weapon.Keys).map(coords => coords.y)
        return acc
    }, {})