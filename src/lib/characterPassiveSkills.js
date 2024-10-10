import en from "../../game/client/Content/Localization/Game/en/Game.json";
import DT_PassiveSkillData from "../../game/client/Content/Product/DataTable/DT_PassiveSkillData.json"
import DT_StatusBuffData from "../../game/client/Content/Product/DataTable/DT_StatusBuffData.json"

export default Object.values(DT_PassiveSkillData[0].Rows)
    .map(skill => {
        const nameId = skill.m_passive_skill_info.m_name.UID
        const name = en.ST_SevenUI[nameId]
        const descId = skill.m_passive_skill_info.m_info.UID
        const desc = en.ST_SevenUI[descId]
        const buffId = skill.m_passive_skill_info.m_using_status_buff_id
        let buff;

        if (buffId > -1) {
            buff = Object.values(DT_StatusBuffData[0].Rows).find(b => b.m_id === buffId)
        }

        return {
            ...skill,
            name,
            desc,
            buff
        }
    })