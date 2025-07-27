import { getRandomIntInRange, sleep } from "../module/utils"
import particlePoolManager from "../particle/particlePoolManager"
import eventManager from "../module/feature/eventManager"
import TYPE from "../definition/type"

const minRippleCount = 2
const maxRippleCount = 5
const followUpDelay = 500
const wrapUpDelay = 1000

async function registerPlayHandler() {
    play()
    
    // test()

    // eventManager.finale(TYPE.EXPLOSION.HUGE_BURST)
    // await sleep(wrapUpDelay)
    // eventManager.ripple(TYPE.EXPLOSION.FESTIVAL_ERUPT, 3)
    // await particlePoolManager.isActivateParticlesPoolEmpty()
}

// async function test() {
//     while(1) {
//         eventManager.shot(TYPE.EXPLOSION.BLOOM)
//         await particlePoolManager.isActivateParticlesPoolEmpty()
//     }
// }

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
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.BURST)
        await sleep(followUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.finale(TYPE.EXPLOSION.PETITE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.volley(TYPE.EXPLOSION.PETITE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.FESTIVAL_ERUPT, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.shot(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.CHAIN_BURST, 5)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.FESTIVAL_ERUPT)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.BURST)
        await sleep(followUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, 5)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.BURST)
        await sleep(followUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.HUGE_BURST, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()
        
        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        await sleep(followUpDelay)
        eventManager.volley(TYPE.EXPLOSION.PETITE_BURST)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        await sleep(followUpDelay)
        eventManager.shot(TYPE.EXPLOSION.FESTIVAL_ERUPT)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.CHAIN_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.HUGE_BURST, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.FESTIVAL_ERUPT)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.PETITE_BURST, 6)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.BURST, getRandomIntInRange(minRippleCount, maxRippleCount))
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.volley(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.BLOOM, 2)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.CHAIN_BURST, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        eventManager.finale(TYPE.EXPLOSION.HUGE_BURST)
        await sleep(wrapUpDelay)
        eventManager.ripple(TYPE.EXPLOSION.FESTIVAL_ERUPT, 3)
        await particlePoolManager.isActivateParticlesPoolEmpty()

        // Test.
        // particlePoolManager.countPool()
        // alert('End')
        // break
    }
}

export default registerPlayHandler