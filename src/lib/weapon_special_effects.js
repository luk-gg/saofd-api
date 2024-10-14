import DT_WeaponSpecialEffectLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponSpecialEffectLotData.json"
import DT_EquipSpecialEffectData from "../../game/client/Content/Product/DataTable/Inventory/DT_EquipSpecialEffectData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";

const data = Object.entries(DT_WeaponSpecialEffectLotData[0].Rows)
    .reduce((acc, [key, value]) => {
        const { rate } = value
        const [itemId, effectId] = key.split(":")
        const effectData = DT_EquipSpecialEffectData[0].Rows[effectId]
        const { no_duplication, lot_category, param_value, param_additional_value, level, exclusive_character } = effectData
        const name = en.ST_SevenUI[effectData.name]
        const lot = lot_category.split("::").pop()
        const charId = exclusive_character.split("::").pop()

        if (!acc[itemId]) acc[itemId] = []

        acc[itemId].push({
            id: effectId,
            name,
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

    // Since all the line rates add up to some high number (1312~1425), I assume it's (rate / sumOfRates) inside each lot ("Normal"/"Legendary")
    data[key] = data[key].map(obj => ({ ...obj, rateInLot: obj.rate / sumOfRates[obj.lot] }))
}

export default data