import DT_DropItemData from "../../game/client/Content/Product/DataTable/DT_DropItemData.json"
import DT_ItemData from "../../game/client/Content/Product/DataTable/DT_ItemData.json"
import DT_ItemPresetData from "../../game/client/Content/Product/DataTable/DT_ItemPresetData.json"

// True drop rates are too complex and likely not as useful to end users, so just keep rates as-is and display on front-end. Can be revisited in the future to display in "20%~30%" notation.
// See discussion: https://discord.com/channels/862600196704829440/862600196704829443/1298794064581234758

const allItems = Object.values(DT_ItemData[0].Rows)
const allPresets = Object.entries(DT_ItemPresetData[0].Rows)
    .map(([key, data]) => {
        // Append full item data to the id and rate.
        const item_infos = data.item_infos
            .map(obj => ({ ...obj, ...allItems.find(item => item.id === obj.id) }))
        return {
            name: key,
            ...data,
            item_infos
        }
    })

function getDropInfo(itemId, dropRateObj) {
    const item = allItems.find(item => item.id === itemId)
    let presetContents;
    if (item.type === "ESGItemType::Preset") {
        presetContents = allPresets.find(obj => obj.id === itemId)
    }
    return {
        ...dropRateObj,
        ...item,
        presetContents
    }
}

const sources = Object.entries(DT_DropItemData[0].Rows)
    .map(([key, data]) => {
        const { id, fixed_item_ids, drop_num_max, drop_num_min, item_infos, exp } = data
        const guaranteedDrops = fixed_item_ids.map(itemId => getDropInfo(itemId))
        const rngDrops = item_infos.map(obj => getDropInfo(obj.id, obj))

        return {
            id,
            content: key,
            drop_num_max,
            drop_num_min,
            exp,
            guaranteedDrops,
            rngDrops
        }
    })

export default sources

export function getDropSources(id, type, value) {
    function isItemMatch(item) {
        const idMatch = id ? item.id === id : true
        const typeMatch = type ? item.type === type : true
        const valueMatch = value ? item.value === value : true
        return idMatch && typeMatch && valueMatch
    }

    return sources
        .reduce((acc, source) => {
            [...source.guaranteedDrops, ...source.rngDrops]
                .forEach(drop => {
                    if (isItemMatch(drop)) {
                        acc.push({
                            content: source.content,
                            rate: drop.rate ?? 100
                        })
                    }

                    // Assume the same id wouldn't exist twice, so filter() is unnecessary and find() is fine.
                    const dropInPreset = drop.presetContents?.item_infos.find(presetDrop => isItemMatch(presetDrop))

                    if (dropInPreset) {
                        const presetTotalRate = drop.presetContents.item_infos.reduce((acc, curr) => acc += curr.rate, 0)

                        const otherRatesInPreset = drop.presetContents.item_infos.reduce((acc, curr) => {
                            if (!isItemMatch(curr)) acc.push(parseInt(curr.rate))
                            return acc
                        }, [])
                            .sort((a, b) => a - b)

                        acc.push({
                            content: source.content,
                            rate: drop.rate ?? 100, // drop rate of the preset/group
                            rateInPreset: dropInPreset.rate, // drop rate of the target item
                            presetTotalRate, // sum rates in group
                            otherRatesInPreset // other rates in group, for sampling without replacement
                        })
                    }
                })
            return acc
        }, [])
}

// Test getting drop rates if item is only contained in presets
// console.log(getDropSources(10305, "ESGItemType::Weapon", 4))

// List all unique item types
// console.log(Object.values(DT_ItemData[0].Rows)
//     .reduce((acc, curr) => {
//         acc[curr.type] = null
//         return acc
//     }, {}))