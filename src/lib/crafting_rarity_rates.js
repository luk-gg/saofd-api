import DA_GenerateItemData from "../../game/client/Content/Product/DataTable/Inventory/DA_GenerateItemData.json"

const DA_GenerateItemData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DA_GenerateItemData*", { eager: true, import: "default" })
const GenerateItemData = Object.values(DA_GenerateItemData_files).reduce((acc, file) => ({ ...acc, ...file[0].Properties }), {})

export default Object.entries(GenerateItemData).reduce((acc, [key, values]) => {
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