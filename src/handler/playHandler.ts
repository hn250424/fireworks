import TYPE from "../definition/type"
import eventManager from "../module/feature/eventManager"
import utils from "../module/utils"
import particles from "../state/particles"

function registerPlayHandler() {
    // test.
    // (eventManager['test'] as (() => void))()
    
    // play()
}

async function play() {
    while (1) {
        getShotEvent()()
        await particles.isEmpty()

        getRippleEvnet()(4)
        await particles.isEmpty()

        getVolleyEvent()()
        await particles.isEmpty()

        getFinaleEvnet()()
        await particles.isEmpty()
    }
}

function getShotEvent() {
    return eventManager[TYPE.EVENT.SHOT] as (() => void)
}

function getRippleEvnet() {
    return eventManager[TYPE.EVENT.RIPPLE] as ((count: number) => Promise<void>)
}

function getVolleyEvent() {
    const volleyLamdaArr: (() => Promise<void>)[] = eventManager[TYPE.EVENT.VOLLEY] as (() => Promise<void>)[]
    const idx: number = utils.getRandomNumberInRange(0, eventManager[TYPE.EVENT.VOLLEY].length - 1)
    const event = volleyLamdaArr[idx]
    return event
}

function getFinaleEvnet() {
    const finaleLamdaArr: (() => Promise<void>)[] = eventManager[TYPE.EVENT.FINALE] as (() => Promise<void>)[]
    const idx = utils.getRandomNumberInRange(0, eventManager[TYPE.EVENT.FINALE].length - 1)
    const event = finaleLamdaArr[idx]
    return event
}

export default registerPlayHandler