import TYPE from "../definition/type"
import eventManager from "../module/feature/eventManager"
import utils from "../module/utils"
import particlePoolManager from "../module/core/particle/particlePoolManager"

function registerPlayHandler() {
    // test.
    // (eventManager['test'] as (() => void))()

    play()
}

async function play() {
    executeShotEvent()
    await particlePoolManager.isEmpty()

    const rand = utils.getRandomNumberInRange(0, Object.values(TYPE.EVENT.RIPPLE).length)
    executeRippleEvnet(rand)
    await particlePoolManager.isEmpty()

    executeVolleyEvent()
    await particlePoolManager.isEmpty()

    executeFinaleEvnet()
    await particlePoolManager.isEmpty()
    // while (1) {
    //     executeShotEvent()
    //     await particlePoolManager.isEmpty()

    //     const rand = utils.getRandomNumberInRange(0, Object.values(TYPE.EVENT.RIPPLE).length)
    //     executeRippleEvnet(rand)
    //     await particlePoolManager.isEmpty()

    //     executeVolleyEvent()
    //     await particlePoolManager.isEmpty()

    //     executeFinaleEvnet()
    //     await particlePoolManager.isEmpty()
    // }
}

function executeShotEvent() {
    const event = eventManager[TYPE.EVENT.SHOT] as (() => void)
    event()
}

function executeRippleEvnet(count: number) {
    const event = eventManager[TYPE.EVENT.RIPPLE] as ((count: number) => Promise<void>)
    event(count)
}

function executeVolleyEvent() {
    const volleyLamdaArr: (() => Promise<void>)[] = eventManager[TYPE.EVENT.VOLLEY] as (() => Promise<void>)[]
    const idx: number = utils.getRandomNumberInRange(0, eventManager[TYPE.EVENT.VOLLEY].length - 1)
    const event = volleyLamdaArr[idx]
    event()
}

function executeFinaleEvnet() {
    const finaleLamdaArr: (() => Promise<void>)[] = eventManager[TYPE.EVENT.FINALE] as (() => Promise<void>)[]
    const idx = utils.getRandomNumberInRange(0, eventManager[TYPE.EVENT.FINALE].length - 1)
    const event = finaleLamdaArr[idx]
    event()
}

export default registerPlayHandler