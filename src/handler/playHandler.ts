import TYPE from "../definition/type"
import utils from "../module/utils"
import particlePoolManager from "../module/core/particle/particlePoolManager"
import eventManager from "../module/feature/eventManager"
import ParticleFactory from "../module/core/particle/ParticleFactory"

import POINT from "../definition/point"

function registerPlayHandler() {
    eventManager.executeTest()

    // play()
}

async function play() {
    while(1) {
        eventManager.executeAnyShot()
        await particlePoolManager.isActivatePoolEmpty()
    
        const idx = utils.getRandomNumberInRange(0, Object.values(TYPE.EVENT.RIPPLE).length)
        eventManager.executeAnyRipple(idx)
        await particlePoolManager.isActivatePoolEmpty()
    
        eventManager.executeAnyVolley()
        await particlePoolManager.isActivatePoolEmpty()
    
        eventManager.executeAnyFinale()
        await particlePoolManager.isActivatePoolEmpty()
    }
}


export default registerPlayHandler