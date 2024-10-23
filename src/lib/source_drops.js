import DT_DropItemData from "../../game/client/Content/Product/DataTable/DT_DropItemData.json"
import DT_ItemData from "../../game/client/Content/Product/DataTable/DT_ItemData.json"
import DT_ItemPresetData from "../../game/client/Content/Product/DataTable/DT_ItemPresetData.json"

// First, gather all the sources for each DT_ItemData id, such as
// 300015: [{ content, rate }]
// 300016: [{ content, rate }]
const itemDropSources = Object.entries(DT_DropItemData[0].Rows)
    .reduce((acc, [key, data]) => {
        // Guaranteed drops
        for (const id of data.fixed_item_ids) {
            if (!acc[id]) acc[id] = []
            acc[id].push({
                content: key,
                rate: 100,
            })
        }
        // Probability drops
        for (const { id, rate } of data.item_infos) {
            if (!acc[id]) acc[id] = []
            acc[id].push({
                content: key,
                rate,
            })
        }
        return acc
    }, {})

// export default itemDropSources


// Next, map each DT_ItemData id to 

// // Heal (small) 10% + quartz
// {
//     "id": 31001,
//     "rate": 50.0
//   },
//   // Add-on L-XL at 2:1
//   {
//     "id": 32007,
//     "rate": 50.0
//   },
//   // Accessory R~E 2:1
//   {
//     "id": 33024,
//     "rate": 50.0
//   },
//   // Col 1000~5000 (期待値2100); 1000 is 50%, 2000 is 30%, 5000 is 20%
//   {
//     "id": 31016,
//     "rate": 50.0
//   }

export default Object.values(DT_ItemData[0].Rows)
    .map((item) => {
        let dropSources = []

        if (item.type === "ESGItemType::Preset") {
            console.log("Preset", item.id, item.name, Boolean(itemDropSources[item.id]))

            // const preset = Object.entries(DT_ItemPresetData[0].Rows).find(([key, data]) => data.id === item.id)
            // const presetDropSource = itemDropSources[preset.id]
        }
        else {
            dropSources = itemDropSources[item.id]
        }

        // if (!dropSources) console.log(`No drop sources for ${item.id} (${item.name})!`)


        return {
            ...item,
            dropSources
        }
    })





// DT_ItemData

// find item by type and value (parseInt(Deco_00015.split("_").pop()))
// if type is Preset, use DT_ItemPresetData

// look through DT_DropItemData for that item