import DT_WeaponSkinData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponSkinData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { imgPath } from "./utils/index.js";
import { getDropSources } from "./source_drops.js";
import { getCharacterRankSources } from "./source_character_rank.js";

const gameFiles = import.meta.glob(
    "/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_WeaponSkinData*",
    { eager: true, import: "default" }
)
const data = Object.values(gameFiles).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(data)
    .map(([id, item]) => {
        const { paid_only } = item
        const name = en.ST_SevenUI[item.name]
        const desc = en.ST_SevenUI[item.information]
        const icon = imgPath(item.icon.AssetPathName)
        const rarity = item.rarity.split("::").pop()
        const division = item.division.split("::").pop()
        const division_sub = item.division_sub.split("::").pop()
        const charId = item.character.split("::").pop()
        const sources = [...getDropSources(null, "ESGItemType::WeaponSkin", Number(id.slice(3))), ...getCharacterRankSources(id)]

        return {
            id,
            name,
            desc,
            charId,
            rarity,
            division,
            division_sub,
            icon,
            paid_only,
            sources
        }
    })