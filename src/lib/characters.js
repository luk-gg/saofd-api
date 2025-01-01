import DT_BattleCharacterConstStatusData from "../../game/client/Content/Product/DataTable/DT_BattleCharacterConstStatusData.json"; // contains stats for all entities (enenmies, human characters, etc) but appears unused for humans as data for Strea doesn't exist
// DT_CharacterPreset contains very few characters and isn't helpful
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import CHARACTER_ADVANCED_SKILLS from "./character_advanced_skills.js"
import CHARACTER_PASSIVE_SKILLS from "./character_passive_skills.js"
import CHARACTER_RANK_REWARDS from "./character_rank_rewards.js"
import CHARACTER_AWAKENING_STATS from "./character_awakening_stats.js"
import { getBriefArr, sp } from "./utils/index.js";

// TODO: find icon paths from game files

// No base characters file, so scan for characters that have awakening levels (UCR_BaseStatus.json file) and get the ID from the directory name
const UCR_BaseStatus_files = import.meta.glob("/game/client/Content/(Product|Season*)/Character/Human/UCR*/*_BaseStatus*")
const Characters = Object.keys(UCR_BaseStatus_files).map((key) => ({ id: key.split("/")[7], seasonFolder: key.split("/")[4] }))

async function getCharacterData(id, seasonFolder) {
    try {
        // TODO: refactor to include Season1+ data
        // DT_CharacterPreset => CPS_UCR001 => BC_UCR001 except that DT_CharacterPreset contains few characters
        const { default: data } = await import(`../../game/client/Content/${seasonFolder}/Character/Human/${id}/BC_${id}.json`)

        const { m_chara_role, k_health_recover_time, m_stamina_recover, k_stamina_recover_attack_hit, k_skill_gauge_recover_attack_hit, k_resuscitable_range, k_speed_firing_interp_rate, m_guard_range, m_state_base_action_ids, k_name_id, m_name, k_speed_walk, k_speed_run, k_speed_run_second, k_speed_kneeling, k_blend_time_walk_jog, m_weapon_load_name_list, m_chara_role_link_action_types, m_seven_chara_role, m_chara_gender } = data[0].Properties ?? {}

        // Various keys depending on the unique skill here, such as SGUniqueAbilityFly for flying parameters
        // const uniqueAbilities = data.filter(obj => obj.Type.includes("SGUniqueAbility")).map(obj => {
        //     const { m_awakening_hit_add_gauge, m_awakening_buff_id_list, m_unique_gauge, m_hit_add_flag, m_hit_add_gauge, m_apply_equip_special_effect_hit_add, m_damage_add_gauge, m_decrease_gauge, m_always_activate_flag, m_max_activate_flag } = obj

        //     return obj
        // })

        // const { m_just_dodge_grace_time, m_just_guard_grace_time, k_just_guard_heal_rate } = data.find(obj => obj.Type === "SGJustActionComponent")

        // Also: SGDodgeActionComponent, and skeletal mesh stuff 

        return { 
            role: (m_seven_chara_role ?? m_chara_role).split("::").pop().replace("Shooter", "Ranger"),
            gender: sp(m_chara_gender)
        }
    }
    catch (err) {
        // console.error(`Error when importing "/game/client/Content/${seasonFolder}/Character/Human/${id}/BC_${id}.json"`)
    }
}

const entries = await Promise.all(
    Characters.map(async ({ id, seasonFolder }) => {
        const { role, gender } = await getCharacterData(id, seasonFolder) ?? {}
        const name = en.ST_SevenUI[`CharaName_${id}`].replace('{Change}|index(\"Nautilus\",\"Eiji\")', "Eiji");
        const rankRewards = CHARACTER_RANK_REWARDS[id];
        const awakeningStats = CHARACTER_AWAKENING_STATS[id];
        const icon = `/Content/${id === "UCR030" ? "Season1_1" : "Product"}/UI/Texture/HUD/hud_switchchain/cut_in_chara/hud_switchchain_cutin_${id.substring(3)}.png`;
        const passiveSkills = CHARACTER_PASSIVE_SKILLS.filter(skill => skill.m_passive_skill_info.m_use_character_unique === `EVGCharaUnique::${id}`)
        const advancedSkills = CHARACTER_ADVANCED_SKILLS.filter(skill => skill.charIds?.includes(id))

        return {
            id,
            name,
            role,
            gender,
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