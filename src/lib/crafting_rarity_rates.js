import DA_GenerateItemData from "../../game/client/Content/Product/DataTable/Inventory/DA_GenerateItemData.json"

export default Object.entries(DA_GenerateItemData[0].Properties).reduce((acc, [key, values]) => {
    if (key === "price_data") return acc
    acc[key] = {}
    values.forEach(({ Key, Value }) => {
        const rarity = Key.split("::").pop()
        acc[key][rarity] = Value
    })
    // ASSUMPTION!
    // TODO: Fetch real values from game api
    acc[key].Epic = 3.0
    acc[key].Legendary = 1.0
    return acc
}, {})