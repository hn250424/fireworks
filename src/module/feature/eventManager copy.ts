import POINT from "../../definition/point"
import TYPE from "../../definition/type"
import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"
import utils from "../utils"

const launchingDelay = 500

const launchingBaseArr: Coordinates[] = []
const launchingOffsetArr: Coordinates[] = []
const explosionStrikeArr: string[] = []
const explosionChainArr: string[] = []

interface EventManager {
    [key: string]: 
        (() => void) |                              // shot.
        ((count: number) => Promise<void>) |        // ripple.
        (() => Promise<void>)[]                     // volley & finale.
}

const eventManager: EventManager = {
    'init': async () => {
        for (const v of Object.values(POINT.LAUNCHING_BASE)) {
            launchingBaseArr.push(v)
        }

        for (const v of Object.values(POINT.LAUNCHING_OFFSET)) {
            launchingOffsetArr.push(v)
        }

        for (const v of Object.values(TYPE.EXPLOSION.STRIKE)) {
            explosionStrikeArr.push(v)
        }

        for (const v of Object.values(TYPE.EXPLOSION.CHAIN)) {
            explosionChainArr.push(v)
        }
    },

    'test': async () => {
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ...POINT.LAUNCHING_OFFSET.MEDIUM }, TYPE.EXPLOSION.STRIKE.BURST)
    },

    [TYPE.EVENT.SHOT]: () => {
        const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomNumberInRange(0, 5) : utils.getRandomNumberInRange(7, 10)
        const _launchingBase = launchingBaseArr[_launchingBaseIdx]

        const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
        const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
        const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
        const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

        ParticleFactory.createLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosionStrike)
    },

    [TYPE.EVENT.RIPPLE]: async (count: number) => {
        utils.shuffle(launchingBaseArr)

        for (let i = 0; i < count; i++) {
            const _launchingBase = launchingBaseArr[i]
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({..._launchingBase}, {..._launchingOffset}, _explosionStrike)
            await utils.sleep(launchingDelay)
        }
    },

    [TYPE.EVENT.VOLLEY]: [
        // Even indexed, Left to right.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionStrike)
        },

        // Odd indexed, Left to right.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionStrike)
        },

        // Even indexed, Right to left.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionStrike)
        },

        // Odd indexed, Right to left.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionStrike)
        },

        // Even indexed, Center to outer.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionStrike)
        },

        // Odd indexed, Center to outer.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionStrike)
        },

        // Even indexed, Outer to center.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionStrike)
        },

        // Odd indexed, Outer to center.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionStrike)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionStrike)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionStrike)
        }
    ],

    [TYPE.EVENT.FINALE]: [
        // Left to right.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionChain = explosionStrikeArr[_explosionChainIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
        },

        // Right to left.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionChain = explosionStrikeArr[_explosionChainIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
        },

        // Center to outer.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionChain = explosionStrikeArr[_explosionChainIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
        },

        // Outer to center.
        async () => {
            const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
            const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
            const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
            const _explosionChain = explosionStrikeArr[_explosionChainIdx]

            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
            await utils.sleep(launchingDelay)
            ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
        },
    ]
}

const finaleEventArr = [
    // Left to right.
    async () => {
        const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
        const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
        const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
        const _explosionChain = explosionStrikeArr[_explosionChainIdx]

        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
    },

    // Right to left.
    async () => {
        const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
        const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
        const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
        const _explosionChain = explosionStrikeArr[_explosionChainIdx]

        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
    },

    // Center to outer.
    async () => {
        const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
        const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
        const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
        const _explosionChain = explosionStrikeArr[_explosionChainIdx]

        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
    },

    // Outer to center.
    async () => {
        const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
        const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
        const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
        const _explosionChain = explosionStrikeArr[_explosionChainIdx]

        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosionChain)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosionChain)
        await utils.sleep(launchingDelay)
        ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosionChain)
    },
]

export default eventManager