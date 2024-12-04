import en from "../../game/client/Content/Localization/Game/en/Game.json";
import { imgPath } from "./utils";

// Link skill ids to characters that can use them
const skillIdCharIdMap = Object.entries(
    import.meta.glob("../../game/client/Content/(Product|Season*)/Character/Human/**/CPS_*.json",
        { eager: true, import: "default" }
    ))
    .reduce((acc, [path, data]) => {
        const charId = path.replace(".json", "").split("_").pop()
        const skillIds =
            data[0].Properties.setup.m_skill_default_setting?.m_skill_slot
                .map(obj => obj.m_value)
        skillIds?.forEach(id => {
            if (!acc[id]) acc[id] = []
            acc[id].push(charId)
        })
        return acc
    }, {})

// Heavy Attacks are considered an "Advanced Skill"
// Combine SkillAsset (SKA) and SkillHeader (SKH) files
export default await Promise.all(
    Object.values(import.meta.glob("../../game/client/Content/(Product|Season*)/Character/Human/Common/Skill/Asset/*.json", { eager: true, import: "default" }))
        .map(async (arr) => {
            // SkillAsset (SKA) file contains recast_time, type, action_id...
            const { Properties: assetData } = arr[0]
            const fileName = assetData.header.ObjectPath.split("/").pop().split(".")[0]
            const seasonFolder = assetData.header.ObjectPath.split("/")[2]
            const { default: HeaderFile } = await import(`../../game/client/Content/${seasonFolder}/Character/Human/Common/Skill/Header/${fileName}.json`)

            // SkillHeader (SKH) file contains id, name, description, type, icon...
            const headerData = HeaderFile[0].Properties
            const icon = imgPath(headerData.icon_active?.ObjectPath)

            const charIds = skillIdCharIdMap[headerData.id]

            return {
                charIds,
                ...assetData,
                assetType: assetData.type,
                ...headerData,
                headerType: headerData.type,
                name: headerData.name_text_id === "回復結晶" ? en.ST_SevenUI.OptionsItem_70 : en.ST_SevenUI[headerData.name_text_id],
                desc: en.ST_SevenUI[headerData.info_text_id],
                icon
            }
        })
)

// Legacy code for individually getting advanced skills for a certain character id. Can be used if import.meta.glob is inefficient.
// async function getAdvancedSkills(id) {
//     try {
//         const { default: CPS } = await import(`../../game/client/Content/Product/Character/Human/${id}/CPS_${id}.json`)
//         return CPS[0].Properties.setup.m_skill_default_setting.m_skill_slot
//             .filter(obj => obj.m_value > 0)
//             .map(obj => {
//                 const skillId = obj.m_value
//                 return CHARACTER_ADVANCED_SKILLS.find(obj => obj.id === skillId)
//             })
//     } catch (err) {
//         console.error(`Error when importing "/game/client/Content/Product/Character/Human/${id}/CPS_${id}.json"`, err)
//     }
// }