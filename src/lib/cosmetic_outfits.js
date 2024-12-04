import DT_ClothData from "../../game/client/Content/Product/DataTable/Inventory/DT_ClothData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { imgPath } from "./utils/index.js";
import { getDropSources } from "./source_drops.js";
import { getCharacterRankSources } from "./source_character_rank.js";

const gameFiles = import.meta.glob(
    "/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_ClothData*",
    { eager: true, import: "default" }
)
const data = Object.values(gameFiles).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(data)
    .map(([id, item]) => {
        const { model_id, paid_only, entitlement, override_material_id, effect_id, tail_decoration_allowed, is_override_ultimate_skill } = item
        const name = en.ST_SevenUI[item.name]
        const desc = en.ST_SevenUI[item.information]
        const rarity = item.rarity.split("::").pop()
        const icon = imgPath(item.icon.AssetPathName)
        const charId = item.exclusive_character.split("::").pop()
        const sources = [...getDropSources(null, "ESGItemType::ClothSkin", Number(id.slice(3))), ...getCharacterRankSources(id)]

        return {
            id,
            name,
            desc,
            charId,
            rarity,
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