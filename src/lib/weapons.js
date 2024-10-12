// Contains base weapon types
// import DT_WeaponData from "../../game/client/Content/Product/Weapon/Common/DT_WeaponData.json"
import DT_WeaponBaseData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponBaseData.json"
import DT_WeaponGenerateLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponGenerateLotData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { getBriefArr, imgPath } from "./utils";
import WEAPON_ATTACK from "./weaponAttack"

// TODO: Line rates

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
        const craftingRates = DT_WeaponGenerateLotData[0].Rows[wepId]
        const { weak_attribute_damage_up, all_attribute_damage_resist, named_special_effect } = weapon

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
            attack: WEAPON_ATTACK[wepId],
            craftingRates
        }
    })

export const entries_brief = getBriefArr(entries)

export default entries