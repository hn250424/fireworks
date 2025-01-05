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

const testEventArr: (() => Promise<void>)[] = []
const shotEvnetArr: (() => void)[] = []
const rippleEventArr: ((count: number) => Promise<void>)[] = []
const volleyEventArr: (() => Promise<void>)[] = []
const finaleEventArr: (() => Promise<void>)[] = []

// interface EventManager {
//     [key: string]:
//     (() => void) |                              // shot.
//     ((count: number) => Promise<void>) |        // ripple.
//     (() => Promise<void>)[]                     // volley & finale.
// }

// const eventManager: EventManager = {
const eventManager = {
    init() {
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

        testEventArr.push(
            async () => {
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ...POINT.LAUNCHING_OFFSET.MEDIUM }, TYPE.EXPLOSION.STRIKE.BURST)
            },
        )

        shotEvnetArr.push(
            () => {
                const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomNumberInRange(0, 5) : utils.getRandomNumberInRange(7, 10)
                const _launchingBase = launchingBaseArr[_launchingBaseIdx]

                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
                const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

                ParticleFactory.createLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosionStrike)
            },
        )

        rippleEventArr.push(
            async (count: number) => {
                utils.shuffle(launchingBaseArr)

                for (let i = 0; i < count; i++) {
                    const _launchingBase = launchingBaseArr[i]
                    const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                    const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                    const _explosionStrikeIdx = utils.getRandomNumberInRange(0, explosionStrikeArr.length - 1)
                    const _explosionStrike = explosionStrikeArr[_explosionStrikeIdx]

                    ParticleFactory.createLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosionStrike)
                    await utils.sleep(launchingDelay)
                }
            },
        )   // rippleEventArr.push

        volleyEventArr.push(
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
        )   // volleyEventArr.push

        finaleEventArr.push(
            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionChainArr.length - 1)
                const _explosionChain = explosionChainArr[_explosionChainIdx]
        
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
                const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionChainArr.length - 1)
                const _explosionChain = explosionChainArr[_explosionChainIdx]
        
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
                const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionChainArr.length - 1)
                const _explosionChain = explosionChainArr[_explosionChainIdx]
        
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
                const _explosionChainIdx = utils.getRandomNumberInRange(0, explosionChainArr.length - 1)
                const _explosionChain = explosionChainArr[_explosionChainIdx]
        
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
        )   // finaleEventArr.push
    },

    executeTest() {
        testEventArr[0]()
    },

    executeAnyShot() {
        const idx = utils.getRandomNumberInRange(0, shotEvnetArr.length - 1)
        shotEvnetArr[idx]()
    },

    executeAnyRipple(count: number) {
        const idx = utils.getRandomNumberInRange(0, rippleEventArr.length - 1)
        rippleEventArr[idx](count)
    },

    executeAnyVolley() {
        const idx = utils.getRandomNumberInRange(0, volleyEventArr.length - 1)
        volleyEventArr[idx]()
    },

    executeAnyFinale() {
        const idx = utils.getRandomNumberInRange(0, finaleEventArr.length - 1)
        finaleEventArr[idx]()
    }
}

export default eventManager