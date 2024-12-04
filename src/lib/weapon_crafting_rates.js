import DT_WeaponGenerateLotData from "../../game/client/Content/Product/DataTable/Inventory/DT_WeaponGenerateLotData.json"

const DT_WeaponGenerateLotData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_WeaponGenerateLotData*", { eager: true, import: "default" })
const WeaponGenerateLotData = Object.values(DT_WeaponGenerateLotData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

// Sum of all rates for each pool
const totalCraftingRates = Object.values(WeaponGenerateLotData).reduce((acc, curr, index) => {
    if (index === 0) return { ...curr }
    for (let key in acc) {
        acc[key] += curr[key]
    }
    return acc
}, {})

export default Object.entries(WeaponGenerateLotData).reduce((acc, [wepId, rates]) => {
    acc[wepId] = {}
    for (let key in rates) {
        acc[wepId][key] = rates[key] / totalCraftingRates[key]
    }
    return acc
}, {})