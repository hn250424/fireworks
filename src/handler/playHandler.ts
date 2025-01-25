import { getRandomNumberInRange } from "../module/utils"
import particlePoolManager from "../module/core/particle/particlePoolManager"
import eventManager from "../module/feature/eventManager"

const minRippleCount = 2
const maxRippleCount = 5

function registerPlayHandler() {
    // eventManager.executeTest()  

    play()
}

async function play() {
    while(1) {
        eventManager.executeRoutineShot()
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeSpecialShot()
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeHighlightsShot()
        await particlePoolManager.isActivatePoolEmpty()
        
        eventManager.executeRoutineRipple(getRandomNumberInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeSpecialRipple(getRandomNumberInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeHighlightsRipple(getRandomNumberInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeRoutineVolley()
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeSpecialVolley()
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeHighlightsVolley()
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeRoutineFinale()
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeSpecialFinale()
        await particlePoolManager.isActivatePoolEmpty()

        eventManager.executeHighlightsFinale()
        await particlePoolManager.isActivatePoolEmpty()
    }
}


export default registerPlayHandler