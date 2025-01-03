import POINT from "../../definition/point"
import TYPE from "../../definition/type"
import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"
import utils from "../utils"

const launchingDelay = 500

// todo
const launchingBaseArr: Coordinates[] = []
for (const v of Object.values(POINT.LAUNCHING_BASE)) {
    launchingBaseArr.push(v)
}
const launchingOffsetArr: Coordinates[] = []
for (const v of Object.values(POINT.LAUNCHING_OFFSET)) {
    launchingOffsetArr.push(v)
}

interface EventManager {
    [key: string]: 
        (() => void) |                              // shot.
        ((count: number) => Promise<void>) |        // ripple.
        (() => Promise<void>)[]                     // volley & finale.
}

const eventManager: EventManager = {
    'test': async () => {
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...POINT.LAUNCHING_OFFSET.HIGH }, TYPE.EXPLOSION.STRIKE.BURST)
    },

    [TYPE.EVENT.SHOT]: () => {
        const randomLaunchingBasePoint = (Math.random() > 0.5) ? utils.getRandomNumberInRange(0, 5) : utils.getRandomNumberInRange(7, 10)
        const launchingBasePoint = launchingBaseArr[randomLaunchingBasePoint]

        const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
        const launchingOffsetPoint = launchingOffsetArr[randdomNumber]
        const idx = getRandomStrikeIdx()

        ParticleFactory.createLaunchingParticle({ ...launchingBasePoint }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
    },

    [TYPE.EVENT.RIPPLE]: async (count: number) => {
        utils.shuffle(launchingBaseArr)

        for (let i = 0; i < count; i++) {
            const _launchingBasePoint = launchingBaseArr[i]
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffsetPoint = launchingOffsetArr[randdomNumber]
            const _idx = getRandomStrikeIdx()
            ParticleFactory.createLaunchingParticle({..._launchingBasePoint}, {..._launchingOffsetPoint}, Object.values(TYPE.EXPLOSION.STRIKE)[_idx])
            await utils.sleep(launchingDelay)
        }
    },

    [TYPE.EVENT.VOLLEY]: [
        // Even indexed, Left to right.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Left to right.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Even indexed, Right to left.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Right to left.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Even indexed, Center to outer.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Center to outer.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Even indexed, Outer to center.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        },

        // Odd indexed, Outer to center.
        async () => {
            const idx = getRandomStrikeIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.STRIKE)[idx])
        }
    ],

    [TYPE.EVENT.FINALE]: [
        // Left to right.
        async () => {
            const idx = getRandomChainIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },

        // Right to left.
        async () => {
            const idx = getRandomChainIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },

        // Center to outer.
        async () => {
            const idx = getRandomChainIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },

        // Outer to center.
        async () => {
            const idx = getRandomChainIdx()
            const randdomNumber = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const launchingOffsetPoint = launchingOffsetArr[randdomNumber]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...launchingOffsetPoint }, Object.values(TYPE.EXPLOSION.CHAIN)[idx])
        },
    ]
}

function getRandomStrikeIdx(): number {
    return utils.getRandomNumberInRange(0, Object.keys(TYPE.EXPLOSION.STRIKE).length - 1)
}

function getRandomChainIdx(): number {
    return utils.getRandomNumberInRange(0, Object.keys(TYPE.EXPLOSION.CHAIN).length - 1)
}

export default eventManager