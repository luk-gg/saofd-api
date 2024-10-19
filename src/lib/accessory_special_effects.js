import DT_OrnamentSpecialEffectLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentSpecialEffectLotData.json"
import DT_EquipSpecialEffectData from "../../game/client/Content/Product/DataTable/Inventory/DT_EquipSpecialEffectData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import SPECIAL_EFFECT_CATEGORIES from "./special_effect_categories"

const data = Object.entries(DT_OrnamentSpecialEffectLotData[0].Rows)
    .reduce((acc, [key, value]) => {
        const { rate } = value
        const [itemId, effectId] = key.split(":")
        const effectData = DT_EquipSpecialEffectData[0].Rows[effectId]
        const { no_duplication, lot_category, param_value, param_additional_value, level, exclusive_character } = effectData
        const name = en.ST_SevenUI[effectData.name]
        const lot = lot_category.split("::").pop()
        const charId = exclusive_character.split("::").pop()

        const desc = SPECIAL_EFFECT_CATEGORIES.find(obj =>
            effectData.param_category.split("::").pop() === "None"
                ? obj.EffectId === effectId
                : obj.Category === effectData.param_category
        )
            .desc
            .replace("{param}", param_value)
            .replace("{param2}", param_additional_value)

        if (!acc[itemId]) acc[itemId] = []

        acc[itemId].push({
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