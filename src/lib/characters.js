import DT_BattleCharacterConstStatusData from "../../game/client/Content/Product/DataTable/DT_BattleCharacterConstStatusData.json";
import en from "../../game/client/Content/Localization/Game/en/Game.json";
import CHARACTER_ADVANCED_SKILLS from "./character_advanced_skills.js"
import CHARACTER_PASSIVE_SKILLS from "./character_passive_skills.js"
import CHARACTER_RANK_REWARDS from "./character_rank_rewards.js"
import CHARACTER_AWAKENING_STATS from "./character_awakening_stats.js"
import { getBriefArr, getBriefData } from "./utils/index.js";
import WEAPONS from "./weapons.js"

// TODO: images
// TODO: roles

const entries = await Promise.all(
    Object.entries(DT_BattleCharacterConstStatusData[0].Rows)
        // Since the file contains enemies as well, filter down to playable characters
        .filter(([key]) => key.includes("UCR"))
        .map(async ([key, baseStats]) => {
            const charId = key.split("_")[0];
            const name = en.ST_SevenUI[`EventCharaName_${charId}`];
            const rankRewards = CHARACTER_RANK_REWARDS[charId];
            const awakeningStats = CHARACTER_AWAKENING_STATS[charId];
            const icon = `/Content/Product/UI/Texture/HUD/hud_switchchain/cut_in_chara/hud_switchchain_cutin_${charId.substring(3)}.png`;
            const passiveSkills = CHARACTER_PASSIVE_SKILLS.filter(skill => skill.m_passive_skill_info.m_use_character_unique === `EVGCharaUnique::${charId}`)
            const advancedSkills = CHARACTER_ADVANCED_SKILLS.filter(skill => skill.charIds?.includes(charId))

            const weapons = []
            const elements = WEAPONS.reduce((acc, wep) => {
                if (wep.charId === charId) {
                    weapons.push(getBriefData(wep));
                    wep.elements.forEach(element => {
                        if (!acc.includes(element)) acc.push(element)
                    })
                }
                return acc
            }, [])

            return {
                id: charId,
                name,
                elements,
                baseStats,
                rankRewards,
                awakeningStats,
                icon,
                passiveSkills,
                advancedSkills,
                weapons
            };
        })
)

export const entries_brief = getBriefArr(entries)

export default entries