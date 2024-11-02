import COSMETIC_DECORATIONS from "./cosmetic_decorations"
import COSMETIC_OUTFITS from "./cosmetic_outfits"
import COSMETIC_WEAPON_SKINS from "./cosmetic_weapon_skins"

const entries = [...COSMETIC_OUTFITS, ...COSMETIC_DECORATIONS, ...COSMETIC_WEAPON_SKINS]

export const entries_brief = getBriefArr(entries)

export default entries