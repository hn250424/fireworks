import POINT from "../definition/point"
import eventManager from "../module/feature/eventManager"

function registerPlayHandler() {
    play()
}

async function play() {
    // Object.values(POINT.LAUNCHING_BASE).forEach(p => {
    //     eventManager.erupt(p, POINT.LAUNCHING_OFFSET.HIGH)
    // })

    eventManager.burst(POINT.LAUNCHING_BASE.THREE, POINT.LAUNCHING_OFFSET.LOW)
    // await particles.isEmpty()
}

export default registerPlayHandler