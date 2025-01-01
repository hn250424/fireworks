import TYPE from "../definition/TYPE"
import eventManager from "../module/feature/eventManager"
import { getRandomNumberInRange } from "../module/utils"
import particles from "../state/particles"

function registerPlayHandler() {
    // test.
    // (eventManager['test'] as (() => void))()
    
    play()
}

async function play() {
    while (1) {
        getEvent(TYPE.EVENT.SHOT)()
        await particles.isEmpty()

        getEvent(TYPE.EVENT.VOLLEY)()
        await particles.isEmpty()

        getEvent(TYPE.EVENT.FINALE)()
        await particles.isEmpty()
    }
}

function getEvent(eventType: string): (() => void) | (() => Promise<void>) {
    switch (eventType) {
        case TYPE.EVENT.SHOT:
            return eventManager[TYPE.EVENT.SHOT] as (() => void)
        case TYPE.EVENT.VOLLEY:
            const volleyIdx = getRandomNumberInRange(0, eventManager[TYPE.EVENT.VOLLEY].length - 1)
            const volleyEvent = (eventManager[TYPE.EVENT.VOLLEY] as (() => Promise<void>)[])[volleyIdx]
            return volleyEvent
        case TYPE.EVENT.FINALE:
            const finaleIdx = getRandomNumberInRange(0, eventManager[TYPE.EVENT.FINALE].length - 1)
            const finaleEvent = (eventManager[TYPE.EVENT.FINALE] as (() => Promise<void>)[])[finaleIdx]
            return finaleEvent
        default:
            return () => {}
    }
}

export default registerPlayHandler