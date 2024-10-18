// Contains base weapon types
// import DT_WeaponData from "../../game/client/Content/Product/Weapon/Common/DT_WeaponData.json"
import DT_OrnamentData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { getBriefArr, imgPath } from "./utils";
import ACCESSORY_HEALTH from "./accessory_health"
import ACCESSORY_SPECIAL_EFFECTS from "./accessory_special_effects"
import ACCESSORY_CRAFTING_RATES from "./accessory_crafting_rates"


const entries = Object.entries(DT_OrnamentData[0].Rows)
    .map(([accId, accessory]) => {
        const name = en.ST_SevenUI[accessory.name]
        const icon = imgPath(accessory.icon.AssetPathName)
        const role = accessory.role.split("::").pop()
        const type = accessory.type.split("::").pop()
        const dlc = accessory.dlc.split("::").pop()
        const baseStatus = accessory.base_status.split("::").pop()
        const craftingRates = ACCESSORY_CRAFTING_RATES[accId]
        const specialEffects = ACCESSORY_SPECIAL_EFFECTS[accId]

        return {
            // ...accessory,
            id: accId,
            name,
            type,
            role,
            dlc,
            baseStatus,
            icon,
            craftingRates,
            specialEffects,
            health: ACCESSORY_HEALTH[accId]
        }
    })
    // Remove duplicates that don't have crafting rates
    .filter(acc => acc.craftingRates)

export const entries_brief = getBriefArr(entries)

export default entries