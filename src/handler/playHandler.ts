import LAUNCH_POINT from "../definition/launchPoint"
import Coordinates from "../type/Coordinates"
import particles from "../state/particles"
import particleEventManager from "../module/feature/particleEventManager"

function registerPlayHandler() {
    play()
}

async function play() {
    const endPoint: Coordinates = { x: 0, y: 7, z: 0 }
    LAUNCH_POINT.forEach(point => {
        const currentPoint: Coordinates = { x: point[0], y: point[1], z: point[2]}
        particleEventManager.launch(currentPoint, endPoint)
    })
    // const currentPoint: Coordinates = { x: 2, y: 0, z: 5 }
    // const endPoint: Coordinates = { x: 0, y: 7, z: 0 }
    // particleEventManager.launch(currentPoint, endPoint)

    // await particles.isEmpty()

    // const currentPoint2: Coordinates = { x: 5, y: 0, z: 2 }
    // const endPoint2: Coordinates = { x: 0, y: 7, z: 0 }
    // particleEventManager.launch(currentPoint2, endPoint2)
}

export default registerPlayHandler