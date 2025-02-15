import { getRandomIntInRange, sleep } from "../module/utils"
import particlePoolManager from "../module/core/particle/particlePoolManager"
import eventManager from "../module/feature/eventManager"
import TYPE from "../definition/type"

const minRippleCount = 2
const maxRippleCount = 5
const closingLaunchingDelay = 1000

async function registerPlayHandler() {
    play()
    // test()
}

async function test() {
    while(1) {
        eventManager.ripple(TYPE.EXPLOSION.BURST, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()
    }
}

async function play() {
    while(1) {
        // Test.
        // particlePoolManager.countPool()

        eventManager.shot(TYPE.EXPLOSION.BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.ripple(TYPE.EXPLOSION.BURST, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.volley(TYPE.EXPLOSION.BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.ripple(TYPE.EXPLOSION.BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.volley(TYPE.EXPLOSION.BLOOM)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(closingLaunchingDelay)
        eventManager.volley(TYPE.EXPLOSION.PETITE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.FESTIVAL_ERUPT, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.CHAIN_BURST, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.ripple(TYPE.EXPLOSION.FESTIVAL_ERUPT, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, 5)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        eventManager.shot(TYPE.EXPLOSION.FESTIVAL_ERUPT)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        eventManager.ripple(TYPE.EXPLOSION.HUGE_BURST, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        eventManager.ripple(TYPE.EXPLOSION.BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        eventManager.volley(TYPE.EXPLOSION.PETITE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.volley(TYPE.EXPLOSION.FESTIVAL_ERUPT)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.FESTIVAL_ERUPT)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.FESTIVAL_ERUPT)
        await sleep(closingLaunchingDelay)
        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.volley(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, 4)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(closingLaunchingDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.HUGE_BURST)
        eventManager.ripple(TYPE.EXPLOSION.CHAIN_BURST, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.HUGE_BURST)
        eventManager.ripple(TYPE.EXPLOSION.FESTIVAL_ERUPT, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        // Test.
        // particlePoolManager.countPool()
        // break
    }
}

export default registerPlayHandler