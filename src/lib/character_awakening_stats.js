import path from "path"

const BaseStatus_files = import.meta.glob("/game/client/Content/(Product|Season*)/Character/Human/**/*_BaseStatus*", { eager: true, import: "default" })

export default Object.entries(BaseStatus_files)
    .reduce((acc, [filePath, data]) => {
        const charId = path.basename(filePath, ".json").split("_")[0]
        const levels = Object.entries(data[0].Rows).map(([key, value]) => {
            const level = parseInt(key)
            return { ...value, level }
        })
        acc[charId] = levels
        return acc
    }, {})

// Legacy code for individually getting awakening stats for a certain character id. Can be used if import.meta.glob is inefficient.
// async function getAwakeningLevelStats(id) {
//     try {
//         const { default: stats } = await import(`../../game/client/Content/Product/Character/Human/${id}/${id}_BaseStatus.json`)
//         return Object.entries(stats[0].Rows).reduce((acc, [key, value]) => {
//             const level = parseInt(key)
//             acc.push({ ...value, level })
//             return acc
//         }, [])
//     }
//     catch (err) {
//         console.error(`Error when importing "/game/client/Content/Product/Character/Human/${id}/${id}_BaseStatus.json"`)
//     }
// }