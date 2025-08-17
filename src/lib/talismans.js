import DT_TalismanData from "../../game/client/Content/Season4/DataTable/Inventory/DT_TalismanData_s4.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { getBriefArr } from "./utils";
import { imgPath, sp } from "/utils";
import TALISMAN_SPECIAL_EFFECTS from "./talisman_special_effects"

const DT_TalismanData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_TalismanData*", { eager: true, import: "default" })
const TalismanData = Object.values(DT_TalismanData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

const entries = Object.entries(TalismanData)
    .map(([id, talisman]) => {
        const name = en.ST_SevenUI[talisman.name]
        const icon = imgPath(talisman.icon.AssetPathName)
        const type = sp(talisman.charm_type)
        const specialEffects = TALISMAN_SPECIAL_EFFECTS[id]

        return {
            // ...talisman,
            id,
            name,
            type,
            icon,
            // craftingRates,
            specialEffects,
        }
    })

export const entries_brief = getBriefArr(entries)

export default entries