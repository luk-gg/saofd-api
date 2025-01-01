import DT_ClothData from "../../game/client/Content/Product/DataTable/Inventory/DT_ClothData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { imgPath } from "./utils/index.js";
import { getDropSources } from "./source_drops.js";
import { getCharacterRankSources } from "./source_character_rank.js";
import { getSerialCodeSources } from "./source_serial_codes.js";

const DT_ClothData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_ClothData*", { eager: true, import: "default" })
const ClothData = Object.values(DT_ClothData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(ClothData)
    .map(([id, item]) => {
        const { model_id, paid_only, entitlement, override_material_id, effect_id, tail_decoration_allowed, is_override_ultimate_skill } = item
        const name = en.ST_SevenUI[item.name]
        const desc = en.ST_SevenUI[item.information]
        const rarity = item.rarity.split("::").pop()
        const icon = imgPath(item.icon.AssetPathName)
        const charId = item.exclusive_character.split("::").pop()
        const sources = [...getDropSources(null, "ESGItemType::ClothSkin", Number(id.slice(3))), ...getCharacterRankSources(id), ...getSerialCodeSources(id)]
        // Couldn't find any code referencing gender for outfits, so the following is derived from description. Some outfits that don't mention a gender can only be worn by a specific character, so in this case default to "None" since charId will contain the condition--avoids needing to look up Sinon to find that she's Female.
        let gender = "None"
        if (desc.includes("female")) gender = "Female"
        else if (desc.includes("male")) gender = "Male"

        return {
            id,
            name,
            desc,
            gender,
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
    .sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });