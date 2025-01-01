import POINT from "../../definition/POINT"
import TYPE from "../../definition/TYPE"
import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"
import { sleep, getRandomNumberInRange } from "../utils"

const launchingDelay = 500

const eventManager = {
    'test': () => {
        generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...POINT.LAUNCHING_OFFSET.HIGH}, TYPE.EXPLOSION.BLOOM)
    },

    [TYPE.EVENT.SHOT]: () => {
        const randomExplosionType = getRandomExplosionType()
        const launchingBasePoint = getLaunchingBasePoint()
        const launchingOffsetPoint = getLaunchingOffsetPoint()

        generateEvent({...launchingBasePoint}, {...launchingOffsetPoint}, randomExplosionType)
    },

    [TYPE.EVENT.VOLLEY]: [
        // evenLeftToRight
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // oddLeftToRight
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // evenRightToLeft
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // oddRightToLeft
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // evenCenterToOuter
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // oddCenterToOuter
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // evenOuterToCenter
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()

            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // oddOuterToCenter
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
        }
    ],

    [TYPE.EVENT.FINALE]: [
        // leftToRight
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // rightToLeft
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // centerToOuter
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
        },

        // outerToCenter
        async () => {
            const randomExplosionType = getRandomExplosionType()
            const launchingOffsetPoint = getLaunchingOffsetPoint()
            
            generateEvent({...POINT.LAUNCHING_BASE.ONE}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FIVE}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.TWO}, {...launchingOffsetPoint}, randomExplosionType)
            generateEvent({...POINT.LAUNCHING_BASE.FOUR}, {...launchingOffsetPoint}, randomExplosionType)
            await sleep(launchingDelay)
            generateEvent({...POINT.LAUNCHING_BASE.THREE}, {...launchingOffsetPoint}, randomExplosionType)
        },
    ]
}

function generateEvent(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: number) {
    ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, explosionType) 
}

function getRandomExplosionType(): number {
    return getRandomNumberInRange(0, Object.keys(TYPE.EXPLOSION).filter(key => isNaN(Number(key))).length - 1)
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