import { getRandomIntInRange } from "../module/utils"
import particlePoolManager from "../module/core/particle/particlePoolManager"
import eventManager from "../module/feature/eventManager"
import TYPE from "../definition/type"

const minRippleCount = 2
const maxRippleCount = 5

async function registerPlayHandler() {
    // eventManager.executeTest()

    // for (let i = 0; i < 4; i++) {
    //     eventManager.executeSpecialFinale()
    //     await particlePoolManager.isActivateParticlesPoolEmpty()
    // }

    // particlePoolManager.countPool()

    play()
}

async function play() {
    while(1) {
        // Test.
        // particlePoolManager.countPool()

        // eventManager.shot(TYPE.EXPLOSION.BLOOM)
        // await particlePoolManager.isActivateParticlesPoolEmpty()

        // eventManager.ripple(TYPE.EXPLOSION.BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        // await particlePoolManager.isActivateParticlesPoolEmpty()
        
        // eventManager.volley(TYPE.EXPLOSION.HUGE_BURST)
        // await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.PETITE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        // Test.
        // particlePoolManager.countPool()
        // break
    }
}


export default registerPlayHandler