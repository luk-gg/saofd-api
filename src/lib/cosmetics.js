import DT_DecorationData from "../../game/client/Content/Product/DataTable/Inventory/DT_DecorationData.json"
import DT_ClothData from "../../game/client/Content/Product/DataTable/Inventory/DT_ClothData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { getBriefArr, imgPath } from "./utils/index.js";

const entries =
    [
        ...Object.entries(DT_ClothData[0].Rows),
        ...Object.entries(DT_DecorationData[0].Rows)
    ]
        .map(([key, item]) => {
            const { model_id, paid_only, entitlement, override_material_id, effect_id } = item
            const name = en.ST_SevenUI[item.name]
            const desc = en.ST_SevenUI[item.information]
            const rarity = item.rarity.split("::").pop()
            const icon = imgPath(item.icon.AssetPathName)
            const charId = item.exclusive_character.split("::").pop()

            // Decorations only
            const gender = item.gender?.split("::").pop()
            const { category } = item

            // Outfits only
            const { tail_decoration_allowed, is_override_ultimate_skill } = item

            return {
                id: key,
                name,
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
                tail_decoration_allowed,
                is_override_ultimate_skill
            }
        })

export const entries_brief = getBriefArr(entries)

export default entries