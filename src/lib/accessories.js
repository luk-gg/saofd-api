// Contains base weapon types
// import DT_WeaponData from "../../game/client/Content/Product/Weapon/Common/DT_WeaponData.json"
import DT_OrnamentData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentData.json"
import DT_OrnamentGenerateLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentGenerateLotData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { getBriefArr, imgPath } from "./utils";
import ACCESSORY_HEALTH from "./accessoryHealth"

const entries = Object.entries(DT_OrnamentData[0].Rows)
    .map(([accId, accessory]) => {
        const name = en.ST_SevenUI[accessory.name]
        const icon = imgPath(accessory.icon.AssetPathName)
        const role = accessory.role.split("::").pop()
        const type = accessory.type.split("::").pop()
        const dlc = accessory.dlc.split("::").pop()
        const baseStatus = accessory.base_status.split("::").pop()
        const craftingRates = DT_OrnamentGenerateLotData[0].Rows[accId]

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
            health: ACCESSORY_HEALTH[accId]
        }
    })

export const entries_brief = getBriefArr(entries)

export default entries