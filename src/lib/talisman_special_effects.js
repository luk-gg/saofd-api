import DT_EquipSpecialEffectData from "../../game/client/Content/Product/DataTable/Inventory/DT_EquipSpecialEffectData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import SPECIAL_EFFECT_CATEGORIES from "./special_effect_categories"

const DT_TalismanData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_TalismanData*", { eager: true, import: "default" })
const TalismanData = Object.values(DT_TalismanData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

const DT_EquipSpecialEffectData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_EquipSpecialEffectData*", { eager: true, import: "default" })
const EquipSpecialEffectData = Object.values(DT_EquipSpecialEffectData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})
const EquipSpecialEffectDataList = Object.values(EquipSpecialEffectData)

const data = Object.entries(TalismanData)
    .reduce((acc, [itemId, talisman]) => {

        acc[itemId] = EquipSpecialEffectDataList
            .filter(specialEffect => specialEffect.main_effect_talisman_type === talisman.charm_type)
            .map(specialEffect => {
                const rate = 0
                const effectId = parseInt(specialEffect.name.split("_")[1])
                const { no_duplication, lot_category, param_value, param_additional_value, level, exclusive_character } = specialEffect
                const name = en.ST_SevenUI[specialEffect.name]
                const lot = lot_category.split("::").pop()
                const charId = exclusive_character.split("::").pop()
                const desc = SPECIAL_EFFECT_CATEGORIES.find(obj =>
                    specialEffect.param_category.split("::").pop() === "None"
                        ? obj.EffectId === effectId
                        : obj.Category === specialEffect.param_category
                )
                    .desc
                    .replace("{param}", param_value)
                    .replace("{param2}", param_additional_value)

                return {
                    id: effectId,
                    name,
                    desc,
                    rate,
                    lot,
                    charId,
                    param_value,
                    param_additional_value,
                    no_duplication,
                    level,
                }
            })

        return acc
    }, {})

for (const key in data) {
    const sumOfRates = data[key].reduce((acc, curr) => {
        acc[curr.lot] += curr.rate
        return acc
    }, { Normal: 0, Legendary: 0 })

    // Since all the line rates add up to some high number (1312~1425), I assume it's (rate / sumOfRates)
    data[key] = data[key].map(obj => ({ ...obj, rateInLot: obj.rate / sumOfRates[obj.lot] }))
}

export default data