import DT_OrnamentSpecialEffectLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentSpecialEffectLotData.json"
import DT_EquipSpecialEffectData from "../../game/client/Content/Product/DataTable/Inventory/DT_EquipSpecialEffectData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";

export default Object.entries(DT_OrnamentSpecialEffectLotData[0].Rows)
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