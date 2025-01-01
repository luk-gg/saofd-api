import DT_WeaponSkinData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponSkinData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { imgPath } from "./utils/index.js";
import { getDropSources } from "./source_drops.js";
import { getCharacterRankSources } from "./source_character_rank.js";
import { getSerialCodeSources } from "./source_serial_codes.js";
import { getDefaultUnlockedSources } from "./source_default_unlocked.js";

const DT_WeaponSkinData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_WeaponSkinData*", { eager: true, import: "default" })
const WeaponSkinData = Object.values(DT_WeaponSkinData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(WeaponSkinData)
    .map(([id, item]) => {
        const { paid_only } = item
        const name = en.ST_SevenUI[item.name]
        const desc = en.ST_SevenUI[item.information]
        const icon = imgPath(item.icon.AssetPathName)
        const rarity = item.rarity.split("::").pop()
        const division = item.division.split("::").pop()
        const division_sub = item.division_sub.split("::").pop()
        const charId = item.character.split("::").pop()
        const sources = [...getDropSources(null, "ESGItemType::WeaponSkin", Number(id.slice(3))), ...getCharacterRankSources(id), ...getSerialCodeSources(id), ...getDefaultUnlockedSources(id)]

        return {
            id,
            name,
            desc,
            charId,
            gender: "None",
            rarity,
            division,
            division_sub,
            icon,
            paid_only,
            sources
        }
    })
    .sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });