import ASSETS from "../../definition/assets"
import POINT from "../../definition/point"
import TYPE from "../../definition/type"
import Coordinates from "../../type/Coordinates"
import stateManager from "../core/stateManager"
import ParticleFactory from "../core/particle/ParticleFactory"
import utils from "../utils"

const launchingDelay = 500

const launchingBaseArr: Coordinates[] = []
const launchingOffsetArr: Coordinates[] = []
const explosionRoutineArr: string[] = []
const explosionFinaleArr: string[] = []

const testEventArr: (() => Promise<void>)[] = []
const shotEvnetArr: (() => void)[] = []
const rippleEventArr: ((count: number) => Promise<void>)[] = []
const volleyEventArr: (() => Promise<void>)[] = []
const finaleEventArr: (() => Promise<void>)[] = []

const eventManager = {
    init() {
        testEventArr.push(
            async () => {
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.ROUTINE.BLOOM)
            },
        )

        for (const v of Object.values(POINT.LAUNCHING_BASE)) { launchingBaseArr.push(v) }
        for (const v of Object.values(POINT.LAUNCHING_OFFSET)) { launchingOffsetArr.push(v) }
        for (const v of Object.values(TYPE.EXPLOSION.ROUTINE)) { explosionRoutineArr.push(v) }
        for (const v of Object.values(TYPE.EXPLOSION.FINALE)) { explosionFinaleArr.push(v) }

        shotEvnetArr.push(
            () => {
                const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomNumberInRange(0, 5) : utils.getRandomNumberInRange(7, 10)
                const _launchingBase = launchingBaseArr[_launchingBaseIdx]

                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
            },
        )

        rippleEventArr.push(
            async (count: number) => {
                utils.shuffle(launchingBaseArr)

                for (let i = 0; i < count; i++) {
                    const _launchingBase = launchingBaseArr[i]
                    const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                    const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                    const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                    const _explosion = explosionRoutineArr[_explosionIdx]

                    ParticleFactory.createLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
                    await utils.sleep(launchingDelay)
                }
            },
        )   // rippleEventArr.push

        volleyEventArr.push(
            // Even indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // volleyEventArr.push

        finaleEventArr.push(
            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionFinaleArr.length - 1)
                const _explosion = explosionFinaleArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionFinaleArr.length - 1)
                const _explosion = explosionFinaleArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionFinaleArr.length - 1)
                const _explosion = explosionFinaleArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionFinaleArr.length - 1)
                const _explosion = explosionFinaleArr[_explosionIdx]
        
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.createLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // finaleEventArr.push
    },

    executeTest() {
        playLaunchSound()
        testEventArr[0]() 
    },

    executeAnyShot() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, shotEvnetArr.length - 1)
        shotEvnetArr[idx]()
    },

    executeAnyRipple(count: number) {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, rippleEventArr.length - 1)
        rippleEventArr[idx](count)
    },

    executeAnyVolley() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, volleyEventArr.length - 1)
        volleyEventArr[idx]()
    },

    executeAnyFinale() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, finaleEventArr.length - 1)
        finaleEventArr[idx]()
    }
}

function playLaunchSound() {
    if (stateManager.getVolumeState()) { 
        new Audio(ASSETS.SOUNDS.LAUNCH).play() 
    }
}

export default eventManager