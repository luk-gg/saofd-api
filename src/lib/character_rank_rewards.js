import DT_CharacterRankUpRewardData from "../../game/client/Content/Product/DataTable/Rank/DT_CharacterRankUpRewardData.json";

const DT_CharacterRankUpRewardData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Rank/DT_CharacterRankUpRewardData*", { eager: true, import: "default" })
const CharacterRankUpRewardData = Object.values(DT_CharacterRankUpRewardData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

export default Object.entries(CharacterRankUpRewardData)
    .reduce((acc, [key, rewards]) => {
        const [id, rankStr] = key.split(":") // "UCR001:25"
        const rank = parseInt(rankStr)

        if (!acc[id]) acc[id] = []
        acc[id].push({ ...rewards, rank })

        return acc
    }, {})