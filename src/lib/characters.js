import DT_BattleCharacterConstStatusData from "../../game/client/Content/Product/DataTable/DT_BattleCharacterConstStatusData.json";
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import CHARACTER_ADVANCED_SKILLS from "./character_advanced_skills.js"
import CHARACTER_PASSIVE_SKILLS from "./character_passive_skills.js"
import CHARACTER_RANK_REWARDS from "./character_rank_rewards.js"
import CHARACTER_AWAKENING_STATS from "./character_awakening_stats.js"
import { getBriefArr } from "./utils/index.js";

// TODO: images

async function getCharacterData(id) {
    try {
        const { default: data } = await import(`../../game/client/Content/Product/Character/Human/${id}/BC_${id}.json`)

        const { m_chara_role, k_health_recover_time, m_stamina_recover, k_stamina_recover_attack_hit, k_skill_gauge_recover_attack_hit, k_resuscitable_range, k_speed_firing_interp_rate, m_guard_range, m_state_base_action_ids, k_name_id, m_name, k_speed_walk, k_speed_run, k_speed_run_second, k_speed_kneeling, k_blend_time_walk_jog, m_weapon_load_name_list, m_chara_role_link_action_types, m_seven_chara_role } = data[0].Properties ?? {}

        // Various keys depending on the unique skill here, such as SGUniqueAbilityFly for flying parameters
        // const uniqueAbilities = data.filter(obj => obj.Type.includes("SGUniqueAbility")).map(obj => {
        //     const { m_awakening_hit_add_gauge, m_awakening_buff_id_list, m_unique_gauge, m_hit_add_flag, m_hit_add_gauge, m_apply_equip_special_effect_hit_add, m_damage_add_gauge, m_decrease_gauge, m_always_activate_flag, m_max_activate_flag } = obj

        //     return obj
        // })

        // const { m_just_dodge_grace_time, m_just_guard_grace_time, k_just_guard_heal_rate } = data.find(obj => obj.Type === "SGJustActionComponent")

        // Also: SGDodgeActionComponent, and skeletal mesh stuff 

        return { role: (m_seven_chara_role ?? m_chara_role).split("::").pop().replace("Shooter", "Ranger") }
    }
    catch (err) {
        console.error(`Error when importing "/game/client/Content/Product/Character/Human/${id}/BC_${id}.json"`)
    }
}

const entries = await Promise.all(
    Object.entries(DT_BattleCharacterConstStatusData[0].Rows)
        // Since the file contains enemies as well, filter down to playable characters
        .filter(([key]) => key.includes("UCR"))
        .map(async ([key, baseStats]) => {
            const charId = key.split("_")[0];
            const { role } = await getCharacterData(charId) ?? {}
            const name = en.ST_SevenUI[`CharaName_${charId}`].replace('{Change}|index(\"Nautilus\",\"Eiji\")', "Eiji");
            const rankRewards = CHARACTER_RANK_REWARDS[charId];
            const awakeningStats = CHARACTER_AWAKENING_STATS[charId];
            const icon = `/Content/Product/UI/Texture/HUD/hud_switchchain/cut_in_chara/hud_switchchain_cutin_${charId.substring(3)}.png`;
            const passiveSkills = CHARACTER_PASSIVE_SKILLS.filter(skill => skill.m_passive_skill_info.m_use_character_unique === `EVGCharaUnique::${charId}`)
            const advancedSkills = CHARACTER_ADVANCED_SKILLS.filter(skill => skill.charIds?.includes(charId))

            return {
                id: charId,
                name,
                role,
                baseStats,
                rankRewards,
                awakeningStats,
                icon,
                passiveSkills,
                advancedSkills,
            };
        })
)

export const entries_brief = getBriefArr(entries)

export default entries