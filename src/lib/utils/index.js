// Linear Interpolation: find a value between val1 and val2. Weight is a value between 0 and 1 that indicates the interpolation factor (0 returns val1, 1 returns val2).
// https://www.trysmudford.com/blog/linear-interpolation-functions/
// export function lerp(val1, val2, weight) {
//     return val1 * (1 - weight) + val2 * weight
// }


// Uses linear interpolation to incrementally add missing values to an UnrealEngine array of [{ Time, Value }] objects and return them as [{ x, y }]
export function RCIM_Linear(arr) {
    return arr.reduce((acc, curr, index) => {
        let { Time: x0, Value: y0 } = curr
        const { Time: x1, Value: y1 } = arr[index + 1] || {}

        // Push the current value from the original array
        acc.push({ x: x0, y: y0 })

        // Fill in missing values from the current Time to the next Time
        let missingX = x0
        while (x1 > missingX + 1) {
            missingX++
            const missingY = y0 + (y1 - y0) * ((missingX - x0) / (x1 - x0))
            acc.push({ x: missingX, y: missingY })
        }

        return acc
    }, [])
}

export function imgPath(path) {
    return path.replace("/Game", "/Content").split(".")[0] + ".png"
}