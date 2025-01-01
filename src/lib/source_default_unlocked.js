import DT_NPCEquipment from "../../game/client/Content/Product/DataTable/DT_NPCEquipment.json";
import en from "../../game/client/Content/Localization/Game/en/Game.json";

// A naive implementation of which cosmetics are unlocked by default based on which NPCs wear them. I couldn't find any other file referencing these items i.e. Dec00035 (Scarlet Bandana).

const DT_NPCEquipment_files = import.meta.glob("/game/client/Content/(Product|Season*)/DataTable/DT_NPCEquipment*", { eager: true, import: "default" })

const sources = Object.values(DT_NPCEquipment_files).reduce((acc, file) => {
    for (const [charId, equipment] of Object.entries(file[0].Rows)) {
        [
            equipment.m_inventory_decoration.data_id.row_name, // decoration 1
            equipment["m_inventory_decoration[1]"].data_id.row_name, // decoration 2
            equipment.m_inventory_cloth.data_id.row_name, // outfit
        ].forEach(id => {
            if (!acc[id]) acc[id] = []
            const name = en.ST_SevenUI[`CharaName_${charId}`].replace('{Change}|index(\"Nautilus\",\"Eiji\")', "Eiji");
            acc[id].push({ source: "default", charId, name })
        })
    }
    return acc
}, {})

export default sources

export function getDefaultUnlockedSources(itemId) {
    return sources[itemId.toLowerCase()] ?? []
}