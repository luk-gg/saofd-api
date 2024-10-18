import DT_GenerateItemPriceData from "../../game/client/Content/Product/DataTable/Inventory/DT_GenerateItemPriceData.json"

export default Object.values(DT_GenerateItemPriceData[0].Rows).reduce((acc, curr) => {
    acc[curr.player_rank] = curr.price
    return acc
}, {})
