import { getRandomIntInRange } from "../module/utils"
import particlePoolManager from "../module/core/particle/particlePoolManager"
import eventManager from "../module/feature/eventManager"

const minRippleCount = 2
const maxRippleCount = 5

function registerPlayHandler() {
    eventManager.executeTest()  

    // play()
}

async function play() {
    while(1) {
        // Test.
        // particlePoolManager.countPool()

        eventManager.executeRoutineShot()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeSpecialShot()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeHighlightsShot()
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.executeRoutineRipple(getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeSpecialRipple(getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeHighlightsRipple(getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeRoutineVolley()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeSpecialVolley()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeHighlightsVolley()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeRoutineFinale()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeSpecialFinale()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.executeHighlightsFinale()
        await particlePoolManager.isActivateParticlesPoolEmpty()

        // Test.
        // particlePoolManager.countPool()
        // break
    }
}


export default registerPlayHandler