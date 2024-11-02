import DT_CharacterRankUpRewardData from "../../game/client/Content/Product/DataTable/Rank/DT_CharacterRankUpRewardData.json";
import en from "../../game/client/Content/Localization/Game/en/Game.json";

const sources = Object.entries(DT_CharacterRankUpRewardData[0].Rows)
    .reduce((acc, [key, rewards]) => {
        const [id, rankStr] = key.split(":") // "UCR001:25"
        const rank = parseInt(rankStr)
        const rankRewards = []

        for (const rewardType of ["weapon_skin", "cloth", "decoration1", "decoration2", "emote"]) {
            const rowKey = rewardType === "emote" ? "rowName" : "row_name"
            if (rewards[rewardType][rowKey] !== "None") {
                rankRewards.push(rewards[rewardType][rowKey])
            }
        }

        if (rankRewards.length > 0) {
            const name = en.ST_SevenUI[`CharaName_${id}`].replace('{Change}|index(\"Nautilus\",\"Eiji\")', "Eiji");

            acc.push({
                name,
                charId: id,
                rank,
                rewards: rankRewards,
            })
        }

        return acc
    }, [])

export default sources

export function getCharacterRankSources(id) {
    return sources
        .filter(({ rewards }) => rewards.includes(id))
        .map(({ name, charId, rank }) => ({ source: "character rank", name, charId, rank }))
}