import TYPE from "../definition/TYPE"
import eventManager from "../module/feature/eventManager"
import { getRandomNumberInRange } from "../module/utils"
import particles from "../state/particles"

function registerPlayHandler() {
    // test.
    eventManager['test']()

    // play()
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

function getEvent(eventType: number) {
    switch (eventType) {
        case TYPE.EVENT.SHOT:
            return eventManager[TYPE.EVENT.SHOT]
        case TYPE.EVENT.VOLLEY:
            const rand_3 = getRandomNumberInRange(0, eventManager[TYPE.EVENT.VOLLEY].length - 1)
            const event_3 = eventManager[TYPE.EVENT.VOLLEY][rand_3]
            return event_3
        case TYPE.EVENT.FINALE:
            const rand_5 = getRandomNumberInRange(0, eventManager[TYPE.EVENT.FINALE].length - 1)
            const event_5 = eventManager[TYPE.EVENT.FINALE][rand_5]
            return event_5
        default:
            return () => { }
    }
}

export default registerPlayHandler