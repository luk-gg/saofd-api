import DT_DecorationData from "../../game/client/Content/Product/DataTable/Inventory/DT_DecorationData.json"
import DT_ClothData from "../../game/client/Content/Product/DataTable/Inventory/DT_ClothData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { getBriefArr, imgPath } from "./utils/index.js";
import { getDropSources } from "./source_drops.js";

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
            let sources = []

            // Decorations only
            const gender = item.gender?.split("::").pop()
            const { category } = item
            if (Object.hasOwn(item, "category")) {
                sources = getDropSources(null, "ESGItemType::DecorationSkin", Number(key.slice(3)))
            }

            // Outfits only
            const { tail_decoration_allowed, is_override_ultimate_skill } = item
            if (Object.hasOwn(item, "tail_decoration_allowed")) {
                sources = getDropSources(null, "ESGItemType::ClothSkin", Number(key.slice(3)))
            }

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
                is_override_ultimate_skill,
                sources
            }
        })

export const entries_brief = getBriefArr(entries)

export default entries