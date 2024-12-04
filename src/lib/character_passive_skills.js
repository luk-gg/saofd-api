import en from "../../game/client/Content/Localization/Game/en/Game.json";
import DT_PassiveSkillData from "../../game/client/Content/Product/DataTable/DT_PassiveSkillData.json"
import DT_StatusBuffData from "../../game/client/Content/Product/DataTable/DT_StatusBuffData.json"

const DT_PassiveSkillData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/DT_PassiveSkillData*", { eager: true, import: "default" })
const PassiveSkillData = Object.values(DT_PassiveSkillData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

const DT_StatusBuffData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/DT_StatusBuffData*", { eager: true, import: "default" })
const StatusBuffData = Object.values(DT_StatusBuffData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.values(PassiveSkillData)
    .map(skill => {
        const nameId = skill.m_passive_skill_info.m_name.UID
        const name = en.ST_SevenUI[nameId]
        const descId = skill.m_passive_skill_info.m_info.UID
        const desc = en.ST_SevenUI[descId]
        const buffId = skill.m_passive_skill_info.m_using_status_buff_id
        let buff;

        if (buffId > -1) {
            buff = Object.values(StatusBuffData).find(b => b.m_id === buffId)
        }

        return {
            ...skill,
            name,
            desc,
            buff
        }
    })