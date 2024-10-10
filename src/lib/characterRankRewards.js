import DT_CharacterRankUpRewardData from "../../game/client/Content/Product/DataTable/Rank/DT_CharacterRankUpRewardData.json";

export default Object.entries(DT_CharacterRankUpRewardData[0].Rows)
    .reduce((acc, [key, rewards]) => {
        const [id, rankStr] = key.split(":") // "UCR001:25"
        const rank = parseInt(rankStr)

        if (!acc[id]) acc[id] = []
        acc[id].push({ ...rewards, rank })

        return acc
    }, {})