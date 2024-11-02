import DT_DropItemData from "../../game/client/Content/Product/DataTable/DT_DropItemData.json"
import DT_ItemData from "../../game/client/Content/Product/DataTable/DT_ItemData.json"
import DT_ItemPresetData from "../../game/client/Content/Product/DataTable/DT_ItemPresetData.json"

// True drop rates are too complex and likely not as useful to end users, so just keep rates as-is and display on front-end. Can be revisited in the future to display in "20%~30%" notation.
// See discussion: https://discord.com/channels/862600196704829440/862600196704829443/1298794064581234758

// DropItemData: rates do not always add up to 100, for example Kraken phase 3 clear drops add up to 9.2. Min~max number of drops are specified.
// ItemPresetData: rates seem to add up to >= 100. Presumably only 1 drop.

// "Items" such as mods, Col:50~2000 preset, Weapon:Common, Whale Hat, etc.
const allItems = Object.values(DT_ItemData[0].Rows)

// Presets are a group of drops with various rates. Append full item data to each item in each preset.
const allPresets = Object.entries(DT_ItemPresetData[0].Rows)
    .map(([key, data]) => {
        const item_infos = data.item_infos
            .map(obj => ({ ...obj, ...allItems.find(item => item.id === obj.id) }))
        return {
            name: key,
            ...data,
            item_infos
        }
    })

// Get the item info, along with preset info if the item is a preset.
function getDropInfo(itemId, dropRateObj) {
    const item = allItems.find(item => item.id === itemId)
    let presetContents;
    if (item.type === "ESGItemType::Preset") {
        presetContents = allPresets.find(obj => obj.id === itemId)
    }
    return {
        ...dropRateObj, // If item is part of a preset, include its "rate" inside of the preset
        ...item,
        presetContents // If item itself is a preset, include the items inside of that preset
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
    function isTargetItem(item) {
        const idMatch = id ? item.id === id : true
        const typeMatch = type ? item.type === type : true
        const valueMatch = typeof value === "number" ? item.value === value : true
        return idMatch && typeMatch && valueMatch
    }

    return sources
        .reduce((acc, source) => {
            [...source.guaranteedDrops, ...source.rngDrops]
                .forEach(drop => {
                    // Case: the item is dropped directly
                    if (isTargetItem(drop)) {
                        acc.push({
                            source: "drop",
                            content: source.content,
                            rate: drop.rate ?? 100
                        })
                    }

                    // Case: preset containing the item is dropped
                    // Assume the same id wouldn't exist twice, so find() is fine.
                    // If this drop is a preset, find the item within presetContents if its exists.
                    const dropInPreset = drop.presetContents?.item_infos.find(presetDrop => isTargetItem(presetDrop))

                    if (dropInPreset) {
                        // Drop rate of the preset
                        const presetRate = drop.rate ?? 100

                        // Sum of all rates because it can be >= 100
                        const presetTotalRate = drop.presetContents.item_infos.reduce((acc, curr) => acc += curr.rate, 0)

                        const itemRate = dropInPreset.rate
                        const itemRateInPreset = itemRate / presetTotalRate                      

                        acc.push({
                            source: "drop",
                            content: source.content,
                            rate: presetRate,
                            itemRateInPreset
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