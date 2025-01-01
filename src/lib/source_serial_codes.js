import SERIAL_CODES from "./serial_codes"

const sources = SERIAL_CODES.reduce((acc, codeObj) => {
    for (const itemId of codeObj.contents) {
        if (!acc[itemId]) acc[itemId] = []
        acc[itemId].push({ source: "serialcode", ...codeObj, contents: undefined })
    }
    return acc
}, {})

export default sources

export function getSerialCodeSources(itemId) {
    return sources[itemId] ?? []
}