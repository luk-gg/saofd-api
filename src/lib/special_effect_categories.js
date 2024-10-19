import DT_EquipSpecialEffectCategoryTextData from "../../game/client/Content/Product/DataTable/UI/DT_EquipSpecialEffectCategoryTextData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";

export default Object.entries(DT_EquipSpecialEffectCategoryTextData[0].Rows).map(([key, data]) => {
    return {
        stringId: key,
        EffectId: data.EffectId,
        Category: data.Category,
        categoryName: en.ST_SevenUI[data.Name.UID],
        desc: en.ST_SevenUI[data.InfoName.UID]
    }
})