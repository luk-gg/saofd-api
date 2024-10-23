import DT_DropItemData from "../../game/client/Content/Product/DataTable/DT_DropItemData.json"
import DT_ItemData from "../../game/client/Content/Product/DataTable/DT_ItemData.json"
import DT_ItemPresetData from "../../game/client/Content/Product/DataTable/DT_ItemPresetData.json"

// Direct drops and preset (lottery) drops

const itemDatas = Object.values(DT_ItemData[0].Rows)
const dropGroups = Object.entries(DT_ItemPresetData[0].Rows)
    .map(([key, data]) => ({ name: key, ...data }))


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

export default itemDropSources






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

const dSources = Object.entries(DT_DropItemData[0].Rows)
    .map(([key, data]) => ({ content: key, ...data }))

 Object.values(DT_ItemData[0].Rows)
    .map((item) => {
 
        
        let indirectDrops = []

        // Direct drops: the item exists in DT_DropItemData
        const directDrops = itemDropSources[item.id] ?? []

        // Indirect drops: the item exists inside of a preset which exists in DT_DropItemData
        const presetsContainingItem = dropGroups.filter(group => group.item_infos.some(drop => drop.id === item.id))

        for (const preset of presetsContainingItem) {
            const presetTotalRate = preset.item_infos.reduce((acc, curr) => acc += curr.rate, 0)
            const itemRateInPreset = preset.find(drop => drop.id === item.id).rate
            const presetDropSources = itemDropSources[preset.id] ?? []

            
            indirectDrops = presetDropSources.map(source => ({ ...source, rate: 0 }))

            for (const { rate } of preset.item_infos) {
                
            }
            // rateInPreset
        }

        return {
            ...item,
            // sources: [...directDrops, ...indirectDrops]
            directDrops,
            indirectDrops
        }
    })





// DT_ItemData

// find item by type and value (parseInt(Deco_00015.split("_").pop()))
// if type is Preset, use DT_ItemPresetData

// look through DT_DropItemData for that item