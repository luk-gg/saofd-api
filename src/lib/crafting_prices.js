import DT_GenerateItemPriceData from "../../game/client/Content/Product/DataTable/Inventory/DT_GenerateItemPriceData.json"

// Crafting prices by player rank
export default Object.values(DT_GenerateItemPriceData[0].Rows).map(obj => obj.price)
