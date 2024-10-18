// import DT_WeaponData from "../../game/client/Content/Product/Weapon/Common/DT_WeaponData.json" // Contains base weapon string IDs
// import DT_WeaponAttributeEffectTextData from "../../game/client/Content/Product/DataTable/UI/DT_WeaponAttributeEffectTextData.json" // Contains "EX Apply Element" text
import DT_WeaponBaseData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponBaseData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { getBriefArr, imgPath } from "./utils";
import WEAPON_ATTACK from "./weapon_attack"
import WPS_Melee from "../../game/client/Content/Product/Weapon/Common/Spec/WPS_Melee.json"
import WPS_Range from "../../game/client/Content/Product/Weapon/Common/Spec/WPS_Range.json"
import WEAPON_SPECIAL_EFFECTS from "./weapon_special_effects"
import WEAPON_CRAFTING_RATES from "./weapon_crafting_rates"


const entries = Object.entries(DT_WeaponBaseData[0].Rows)
    .map(([wepId, weapon]) => {
        const name = en.ST_SevenUI[weapon.name]
        const icon = imgPath(weapon.icon.AssetPathName)

        const elements = [weapon.attribute, weapon.attribute_2, weapon.attribute_3, weapon.attribute_4]
            .map(value => value.split("::").pop())
            .filter(element => element !== "None")

        const type = [weapon.division, weapon.division_sub]
            .map(value => value.split("::").pop())
            .filter(type => type !== "None")

        const charId = weapon.character.split("::").pop()
        const dlc = weapon.dlc.split("::").pop()
        const craftingRates = WEAPON_CRAFTING_RATES[wepId]
        const { weak_attribute_damage_up, all_attribute_damage_resist, named_special_effect } = weapon

        const stats = [...Object.values(WPS_Melee[0].Rows), ...Object.values(WPS_Range[0].Rows)]
            .filter(wepStats =>
                type.includes(wepStats.division.split("::").pop())
                && wepStats.character_unique === `EVGCharaUnique::${charId}`
            )

        const specialEffects = WEAPON_SPECIAL_EFFECTS[wepId]

        return {
            // ...weapon,
            id: wepId,
            name,
            charId,
            type,
            elements,
            weak_attribute_damage_up,
            all_attribute_damage_resist,
            named_special_effect,
            dlc,
            icon,
            stats,
            craftingRates,
            specialEffects,
            attack: WEAPON_ATTACK[wepId],
        }
    })

export const entries_brief = getBriefArr(entries)

export default entries