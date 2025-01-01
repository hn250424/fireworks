import POINT from "../../definition/POINT"
import TYPE from "../../definition/TYPE"
import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"
import { sleep, getRandomNumberInRange } from "../utils"

const launchingDelay = 500

interface EventManager {
    [key: string]: (() => void) | (() => Promise<void>)[]
}

const eventManager: EventManager = {
    'test': async () => {
        generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...POINT.LAUNCHING_OFFSET.LOW}, TYPE.EXPLOSION.NORMAL.BURST)
    },

    [TYPE.EVENT.SHOT]: () => {
        const idx = getRandomNormalExplosionTypeIndex()
        const launchingBasePoint = getLaunchingBasePoint()
        const launchingOffsetPoint = getLaunchingOffsetPoint()

        generateEvent({...launchingBasePoint}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
    },

    [TYPE.EVENT.VOLLEY]: [
        // Even indexed, Left to right.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        },

        // Odd indexed, Left to right.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        },

        // Even indexed, Right to left.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        },

        // Odd indexed, Right to left.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        },

        // Even indexed, Center to outer.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        },

        // Odd indexed, Center to outer.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        },

        // Even indexed, Outer to center.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        },

        // Odd indexed, Outer to center.
        async () => {
            const idx = getRandomNormalExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.NORMAL)[idx])
        }
    ],

    [TYPE.EVENT.FINALE]: [
        // Left to right.
        async () => {
            const idx = getRandomFinaleExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
        },

        // Right to left.
        async () => {
            const idx = getRandomFinaleExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
        },

        // Center to outer.
        async () => {
            const idx = getRandomFinaleExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
        },

        // Outer to center.
        async () => {
            const idx = getRandomFinaleExplosionTypeIndex()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.FINALE)[idx])
        },
    ]
}

function generateEvent(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: string) {
    ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, explosionType) 
}

function getRandomNormalExplosionTypeIndex(): number {
    return getRandomNumberInRange(0, Object.keys(TYPE.EXPLOSION.NORMAL).length - 1)
}

function getRandomFinaleExplosionTypeIndex(): number {
    return getRandomNumberInRange(0, Object.keys(TYPE.EXPLOSION.FINALE).length - 1)
}

function getLaunchingBasePoint(pointNumber?: number): Coordinates {
    const _number = pointNumber ?? getRandomNumberInRange(1, Object.keys(POINT.LAUNCHING_BASE).length)
    switch(_number) {
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
        default:
            return POINT.LAUNCHING_BASE.THREE
    }
}

function getLaunchingOffsetPoint(pointNumber?: number): Coordinates {
    const _number = pointNumber ?? getRandomNumberInRange(1, Object.keys(POINT.LAUNCHING_OFFSET).length)
    switch(_number) {
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