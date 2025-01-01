import TYPE from "../definition/TYPE"
import eventManager from "../module/feature/eventManager"
import { getRandomNumberInRange } from "../module/utils"
import particles from "../state/particles"

function registerPlayHandler() {
    play()
}

async function play() {
    while (1) {
        getEvent(TYPE.EVENT.ONE)()
        await particles.isEmpty()

        getEvent(TYPE.EVENT.TWO_OR_THREE)()
        await particles.isEmpty()

        getEvent(TYPE.EVENT.FIVE)()
        await particles.isEmpty()
    }
}

function getEvent(eventType: number) {
    switch (eventType) {
        case TYPE.EVENT.ONE:
            return eventManager[TYPE.EVENT.ONE]
        case TYPE.EVENT.TWO_OR_THREE:
            const rand_3 = getRandomNumberInRange(0, eventManager[TYPE.EVENT.TWO_OR_THREE].length - 1)
            const event_3 = eventManager[TYPE.EVENT.TWO_OR_THREE][rand_3]
            return event_3
        case TYPE.EVENT.FIVE:
            const rand_5 = getRandomNumberInRange(0, eventManager[TYPE.EVENT.FIVE].length - 1)
            const event_5 = eventManager[TYPE.EVENT.FIVE][rand_5]
            return event_5
        default:
            return () => { }
    }
}

export default registerPlayHandler