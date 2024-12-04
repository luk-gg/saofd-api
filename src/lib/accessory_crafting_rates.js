import DT_OrnamentGenerateLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_OrnamentGenerateLotData.json"

const DT_OrnamentGenerateLotData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_OrnamentGenerateLotData*", { eager: true, import: "default" })
const OrnamentGenerateLotData = Object.values(DT_OrnamentGenerateLotData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

// Sum of all rates for each pool
const totalCraftingRates = Object.values(OrnamentGenerateLotData).reduce((acc, curr, index) => {
    if (index === 0) return { ...curr }
    for (let key in acc) {
        acc[key] += curr[key]
    }
    return acc
}, {})

export default Object.entries(OrnamentGenerateLotData).reduce((acc, [wepId, rates]) => {
    acc[wepId] = {}
    for (let key in rates) {
        acc[wepId][key] = rates[key] / totalCraftingRates[key]
    }
    return acc
}, {})