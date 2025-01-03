import POINT from "../../definition2/point"
import TYPE from "../../definition2/type"
import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"
import utils from "../utils"

const launchingDelay = 500
const launchingBaseIdxArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

interface EventManager {
    [key: string]: 
        (() => void) |                              // shot.
        ((count: number) => Promise<void>) |        // ripple.
        (() => Promise<void>)[]                     // volley & finale.
}

const eventManager: EventManager = {
    'test': async () => {
        generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.STRIKE.BURST)
    },

    [TYPE.EVENT.SHOT]: () => {
        const randomLaunchingBasePoint = (Math.random() > 0.5) ? utils.getRandomNumberInRange(3, 6) : utils.getRandomNumberInRange(8, 11)

        const idx = getRandomStrikeIdx()
        const launchingBasePoint = getLaunchingBase(randomLaunchingBasePoint)
        const launchingOffsetPoint = getLaunchingOffset()

        generateEvent({ ...launchingBasePoint }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
    },

    [TYPE.EVENT.RIPPLE]: async (count: number) => {
        utils.shuffle(launchingBaseIdxArr)

        for (let i = 0; i < count; i++) {
            const _launchingBasePoint = getLaunchingBase(launchingBaseIdxArr[i])
            const _launchingOffsetPoint = getLaunchingOffset()
            const _idx = getRandomStrikeIdx()
            generateEvent({..._launchingBasePoint}, {..._launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.STRIKE)[_idx])
            await utils.sleep(launchingDelay)
        }
    },

    [TYPE.EVENT.VOLLEY]: [
        // Even indexed, Left to right.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Left to right.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Even indexed, Right to left.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Right to left.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Even indexed, Center to outer.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Center to outer.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Even indexed, Outer to center.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Outer to center.
        async () => {
            const idx = getRandomStrikeIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        }
    ],

    [TYPE.EVENT.FINALE]: [
        // Left to right.
        async () => {
            const idx = getRandomChainIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },

        // Right to left.
        async () => {
            const idx = getRandomChainIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },

        // Center to outer.
        async () => {
            const idx = getRandomChainIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },

        // Outer to center.
        async () => {
            const idx = getRandomChainIdx()
            const launchingOffsetPoint = getLaunchingOffset()

            generateEvent({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.THIRTEEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TWELVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            generateEvent({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            generateEvent({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },
    ]
}

function generateEvent(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: string) {
    ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, explosionType)
}

function getRandomStrikeIdx(): number {
    return utils.getRandomNumberInRange(0, Object.keys(TYPE.EXPLOSION.STRIKE).length - 1)
}

function getRandomChainIdx(): number {
    return utils.getRandomNumberInRange(0, Object.keys(TYPE.EXPLOSION.CHAIN).length - 1)
}

function getLaunchingBase(pointNumber?: number): Coordinates {
    const _number = pointNumber ?? utils.getRandomNumberInRange(1, Object.keys(POINT.LAUNCHING_BASE).length)
    switch (_number) {
        case 1:
            return POINT.LAUNCHING_BASE.ONE
        case 2:
            return POINT.LAUNCHING_BASE.TWO
        case 3:
            return POINT.LAUNCHING_BASE.THREE
        case 4:
            return POINT.LAUNCHING_BASE.FOUR
        case 5:
            return POINT.LAUNCHING_BASE.FIVE
        case 6:
            return POINT.LAUNCHING_BASE.SIX
        case 7:
            return POINT.LAUNCHING_BASE.SEVEN
        case 8:
            return POINT.LAUNCHING_BASE.EIGHT
        case 9:
            return POINT.LAUNCHING_BASE.NINE
        case 10:
            return POINT.LAUNCHING_BASE.TEN
        case 11:
            return POINT.LAUNCHING_BASE.ELEVEN
        case 12:
            return POINT.LAUNCHING_BASE.TWELVE
        case 13:
            return POINT.LAUNCHING_BASE.THIRTEEN
        default:
            return POINT.LAUNCHING_BASE.SEVEN
    }
}

function getLaunchingOffset(pointNumber?: number): Coordinates {
    const _number = pointNumber ?? utils.getRandomNumberInRange(1, Object.keys(POINT.LAUNCHING_OFFSET).length)
    switch (_number) {
        case 1:
            return POINT.LAUNCHING_OFFSET.LOWEST
        case 2:
            return POINT.LAUNCHING_OFFSET.LOW
        case 3:
            return POINT.LAUNCHING_OFFSET.MEDIUM
        case 4:
            return POINT.LAUNCHING_OFFSET.HIGH
        case 5:
            return POINT.LAUNCHING_OFFSET.HIGHEST
        default:
            return POINT.LAUNCHING_OFFSET.MEDIUM
    }
}

export default eventManager