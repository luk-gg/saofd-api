import DT_DropItemData from "../../game/client/Content/Product/DataTable/DT_DropItemData.json"
import DT_ItemData from "../../game/client/Content/Product/DataTable/DT_ItemData.json"
import DT_ItemPresetData from "../../game/client/Content/Product/DataTable/DT_ItemPresetData.json"

// True drop rates are too complex and likely not as useful to end users, so just keep rates as-is and display on front-end.
// See discussion: https://discord.com/channels/862600196704829440/862600196704829443/1298794064581234758

const itemDatas = Object.values(DT_ItemData[0].Rows)
const itemPresets = Object.entries(DT_ItemPresetData[0].Rows)
    .map(([key, data]) => ({ name: key, ...data }))

// First, gather all the sources for each DT_ItemData id, such as
// 300015: [{ content, rate }]
// 300016: [{ content, rate }]
// Direct drops: the item exists in DT_DropItemData
const dropSources = Object.entries(DT_DropItemData[0].Rows)
    .reduce((acc, [key, data]) => {
        // Guaranteed drops
        for (const id of data.fixed_item_ids) {
            if (!acc[id]) acc[id] = []
            acc[id].push({
                content: key,
                rate: 100,
            })

            // itemPresets
            //     .filter(preset => preset.item_infos.some(item => item.id === id))
            //     .forEach(preset => {
            //         acc[id].push({
            //             content: key,
            //             rate: 100,
            //             presetName: preset.name,
            //             presetId: preset.id
            //         })
            //     })

        }
        // Probability drops
        for (const { id, rate } of data.item_infos) {
            if (!acc[id]) acc[id] = []
            acc[id].push({
                item_infos: data.item_infos,
                // content: key,
                // rate,
            })
        }
        return acc
    }, {})

// export default dropSources;

export default itemDatas.map((item) => {
    const directDrops = dropSources[item.id] ?? []

    const presetsContainingItem = itemPresets
        .filter(preset => preset.item_infos.some(drop => drop.id === item.id))

    const indirectDrops = presetsContainingItem
        .map(preset => {
            const itemRate = preset.item_infos.find(drop => drop.id === item.id).rate
            const totalRate = preset.item_infos.reduce((acc, curr) => acc += curr.rate, 0)
            const rateInPreset = itemRate / totalRate

            return {
                ...preset,            
                rateInPreset, // Drop rate of the item inside the preset's drop pool
                sources: dropSources[preset.id] ?? [] // Drop rate of the preset
            }
        })
    // .reduce((acc, curr) => {
    //     if (!acc.find(obj => obj.content === curr.content && obj.rate === curr.rate)) {
    //         acc.push(curr)
    //     }
    //     return acc
    // }, [])

    // const sources = 

    // Indirect drops (not implemented): the item exists inside of a preset which exists in DT_DropItemData

    // // Preset: item is a lottery that contains other items
    // let presetContents;

    // // ASSUMPTION: Only 1 item in a preset is selected
    // if (item.type === "ESGItemType::Preset") {
    //     const preset = itemPresets.find(preset => preset.id === item.id)
    //     // Sum of all "rate" in preset.item_infos because sometimes it goes over 100.
    //     const presetTotalRate = preset.item_infos.reduce((acc, curr) => acc += curr.rate, 0)
    //     // Add data from DT_ItemData into each drop
    //     const presetDrops = preset.item_infos.map(drop => {
    //         const dropData = itemDatas.find(i => i.id === drop.id)
    //         return {
    //             ...drop,
    //             ...dropData,
    //             rateInPreset: drop.rate / presetTotalRate
    //         }
    //     })
    //     presetContents = { ...preset, item_infos: presetDrops }
    // }

    return {
        ...item,
        // presetContents,
        // sources,
        indirectDrops
    }
})





// DT_ItemData

// find item by type and value (parseInt(Deco_00015.split("_").pop()))
// if type is Preset, use DT_ItemPresetData

// look through DT_DropItemData for that item