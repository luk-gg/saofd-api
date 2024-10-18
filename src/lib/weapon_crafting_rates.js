import DT_WeaponGenerateLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponGenerateLotData.json"

// Sum of all rates for each pool
const totalCraftingRates = Object.values(DT_WeaponGenerateLotData[0].Rows).reduce((acc, curr, index) => {
    if (index === 0) return { ...curr }
    for (let key in acc) {
        acc[key] += curr[key]
    }
    return acc
}, {})

export default Object.entries(DT_WeaponGenerateLotData[0].Rows).reduce((acc, [wepId, rates]) => {
    acc[wepId] = {}
    for (let key in rates) {
        acc[wepId][key] = rates[key] / totalCraftingRates[key]
    }
    return acc
}, {})