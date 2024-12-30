import POINT from "../definition/POINT"
import eventManager from "../module/feature/eventManager"

function registerPlayHandler() {
    play()
}

async function play() {
    // Object.values(POINT.LAUNCHING_BASE).forEach(p => {
    //     eventManager.erupt(p, POINT.LAUNCHING_OFFSET.HIGH)
    // })

    eventManager.chainBurst(POINT.LAUNCHING_BASE.THREE, POINT.LAUNCHING_OFFSET.MEDIUM)
    // await particles.isEmpty()
}

export default registerPlayHandler