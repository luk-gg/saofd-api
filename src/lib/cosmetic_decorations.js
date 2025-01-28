import DT_DecorationData from "../../game/client/Content/Product/DataTable/Inventory/DT_DecorationData.json"
import DT_DecorationData_s1 from "../../game/client/Content/Season1/DataTable/Inventory/DT_DecorationData_s1.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { imgPath } from "./utils/index.js";
import { getDropSources } from "./source_drops.js";
import { getCharacterRankSources } from "./source_character_rank.js";
import { getSerialCodeSources } from "./source_serial_codes.js";
import { getDefaultUnlockedSources } from "./source_default_unlocked.js";

const DT_DecorationData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_DecorationData*", { eager: true, import: "default" })
const DecorationData = Object.values(DT_DecorationData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(DecorationData)
    .map(([id, item]) => {
        const { model_id, paid_only, entitlement, override_material_id, effect_id, category } = item
        const name = en.ST_SevenUI[item.name]
        const desc = en.ST_SevenUI[item.information]
        const rarity = item.rarity.split("::").pop()
        const icon = imgPath(item.icon.AssetPathName)
        const charId = item.exclusive_character.split("::").pop()
        const gender = item.gender.split("::").pop()
        const sources = [...getDropSources(null, "ESGItemType::DecorationSkin", Number(id.slice(3))), ...getCharacterRankSources(id), ...getSerialCodeSources(id), ...getDefaultUnlockedSources(id)]

        return {
            id,
            name,
            type: id.slice(0, 3),
            desc,
            charId,
            rarity,
            category,
            gender,
            entitlement, // ??
            icon,
            model_id,
            paid_only,
            override_material_id,
            effect_id,
            sources
        }
    })
    .sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });