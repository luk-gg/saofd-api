import DT_EquipSpecialEffectCategoryTextData from "../../game/client/Content/Product/DataTable/UI/DT_EquipSpecialEffectCategoryTextData.json"
import en from "../../game/client/Content/Localization/Game/en/Game.json";

const DT_EquipSpecialEffectCategoryTextData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/UI/DT_EquipSpecialEffectCategoryTextData*", { eager: true, import: "default" })
const EquipSpecialEffectCategoryTextData = Object.values(DT_EquipSpecialEffectCategoryTextData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(EquipSpecialEffectCategoryTextData).map(([key, data]) => {
    return {
        stringId: key,
        EffectId: data.EffectId,
        Category: data.Category,
        categoryName: en.ST_SevenUI[data.Name.UID],
        desc: en.ST_SevenUI[data.InfoName.UID]
    }
})