import DT_GenerateItemPriceData from "../../game/client/Content/Product/DataTable/Inventory/DT_GenerateItemPriceData.json"

const DT_GenerateItemPriceData_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/Inventory/DT_GenerateItemPriceData*", { eager: true, import: "default" })
const GenerateItemPriceData = Object.values(DT_GenerateItemPriceData_files).reduce((acc, file) => ({ ...acc, ...file[0].Rows }), {})

// Crafting prices by player rank
export default Object.values(GenerateItemPriceData).map(obj => obj.price)
