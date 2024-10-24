import DT_DropItemData from "../../game/client/Content/Product/DataTable/DT_DropItemData.json"
import DT_ItemData from "../../game/client/Content/Product/DataTable/DT_ItemData.json"
import DT_ItemPresetData from "../../game/client/Content/Product/DataTable/DT_ItemPresetData.json"

// True drop rates are too complex and likely not as useful to end users, so just keep rates as-is and display on front-end. Can be revisited in the future to display in "20%~30%" notation.
// See discussion: https://discord.com/channels/862600196704829440/862600196704829443/1298794064581234758

const allItems = Object.values(DT_ItemData[0].Rows)
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

export default Object.entries(DT_DropItemData[0].Rows)
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