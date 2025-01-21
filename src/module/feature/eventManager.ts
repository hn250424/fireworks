import ASSETS from "../../definition/assets"
import POINT from "../../definition/point"
import TYPE from "../../definition/type"
import CVector3 from "../../type/CVector3"
import stateManager from "../core/stateManager"
import ParticleFactory from "../core/particle/ParticleFactory"
import * as utils from "../utils"

import particlePoolManager from "../core/particle/particlePoolManager"

const launchingDelay = 500

const launchingBaseArr: CVector3[] = []
const launchingOffsetArr: CVector3[] = []

const explosionRoutineArr: string[] = []
const explosionSpecialArr: string[] = []
const explosionHighlightsArr: string[] = []

const testEventArr: (() => Promise<void>)[] = []

const shotRoutineArr: (() => void)[] = []
const rippleRoutineArr: ((count: number) => Promise<void>)[] = []
const volleyRoutineArr: (() => Promise<void>)[] = []
const finaleRoutineArr: (() => Promise<void>)[] = []

const shotSpecialArr: (() => void)[] = []
const rippleSpecialArr: ((count: number) => Promise<void>)[] = []
const volleySpecialArr: (() => Promise<void>)[] = []
const finaleSpecialArr: (() => Promise<void>)[] = []

const shotHighlightsArr: (() => void)[] = []
const rippleHighlightsArr: ((count: number) => Promise<void>)[] = []
const volleyHighlightsArr: (() => Promise<void>)[] = []
const finaleHighlightsArr: (() => Promise<void>)[] = []


const eventManager = {
    init() {
        testEventArr.push(
            async () => {
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.HIGHLIGHTS.HUGE_BURST)
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.ROUTINE.BURST)
                // await utils.sleep(200)
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.ROUTINE.BURST)
                // await utils.sleep(200)
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.ROUTINE.BURST)

                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.SPECIAL.ERUPT)
                // await utils.sleep(200)
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.SPECIAL.ERUPT)
                // await utils.sleep(200)
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.SPECIAL.ERUPT)
                
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.SPECIAL.BLOOM)
                // await utils.sleep(200)
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.SPECIAL.BLOOM)
                // await utils.sleep(200)
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.SPECIAL.BLOOM)

                // await particlePoolManager.isActivatePoolEmpty()
                // ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...POINT.LAUNCHING_OFFSET.LOW }, TYPE.EXPLOSION.HIGHLIGHTS.CHAIN_BURST)
            },
        )

        for (const v of Object.values(POINT.LAUNCHING_BASE)) { launchingBaseArr.push(v) }
        for (const v of Object.values(POINT.LAUNCHING_OFFSET)) { launchingOffsetArr.push(v) }

        for (const v of Object.values(TYPE.EXPLOSION.ROUTINE)) { explosionRoutineArr.push(v) }
        for (const v of Object.values(TYPE.EXPLOSION.SPECIAL)) { explosionSpecialArr.push(v) }
        for (const v of Object.values(TYPE.EXPLOSION.HIGHLIGHTS)) { explosionHighlightsArr.push(v) }

        // routine.
        shotRoutineArr.push(
            () => {
                const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomNumberInRange(0, 5) : utils.getRandomNumberInRange(7, 10)
                const _launchingBase = launchingBaseArr[_launchingBaseIdx]

                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
            },
        )   // shotRoutineArr.push

        rippleRoutineArr.push(
            async (count: number) => {
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
                
                utils.shuffle(launchingBaseArr)

                for (let i = 0; i < count; i++) {
                    const _launchingBase = launchingBaseArr[i]
                    const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                    const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]

                    ParticleFactory.provideLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
                    await utils.sleep(launchingDelay)
                }
            },
        )   // rippleRoutineArr.push

        volleyRoutineArr.push(
            // Even indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // volleyEventArr.push

        finaleRoutineArr.push(
            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionRoutineArr.length - 1)
                const _explosion = explosionRoutineArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // finaleRoutineArr.push

        // special.
        shotSpecialArr.push(
            () => {
                const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomNumberInRange(0, 5) : utils.getRandomNumberInRange(7, 10)
                const _launchingBase = launchingBaseArr[_launchingBaseIdx]

                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
            },
        )   // shotSpecialArr.push

        rippleSpecialArr.push(
            async (count: number) => {
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                utils.shuffle(launchingBaseArr)

                for (let i = 0; i < count; i++) {
                    const _launchingBase = launchingBaseArr[i]
                    const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                    const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]

                    ParticleFactory.provideLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
                    await utils.sleep(launchingDelay)
                }
            },
        )   // rippleSpecialArr.push

        volleySpecialArr.push(
            // Even indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // volleySpecialArr.push

        finaleSpecialArr.push(
            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionSpecialArr.length - 1)
                const _explosion = explosionSpecialArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // finaleSpecialArr.push

        // highlights.
        shotHighlightsArr.push(
            () => {
                const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomNumberInRange(0, 5) : utils.getRandomNumberInRange(7, 10)
                const _launchingBase = launchingBaseArr[_launchingBaseIdx]

                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
            },
        )   // shotHighlightsArr.push

        rippleHighlightsArr.push(
            async (count: number) => {
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                utils.shuffle(launchingBaseArr)

                for (let i = 0; i < count; i++) {
                    const _launchingBase = launchingBaseArr[i]
                    const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                    const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]

                    ParticleFactory.provideLaunchingParticle({ ..._launchingBase }, { ..._launchingOffset }, _explosion)
                    await utils.sleep(launchingDelay)
                }
            },
        )   // rippleHighlightsArr.push

        volleyHighlightsArr.push(
            // Even indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Even indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },

            // Odd indexed, Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]

                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
            },

            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // volleyHighlightsArr.push

        finaleHighlightsArr.push(
            // Left to right.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Right to left.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
            },
        
            // Center to outer.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
            },
        
            // Outer to center.
            async () => {
                const _launchingOffsetIdx = utils.getRandomNumberInRange(0, launchingOffsetArr.length - 1)
                const _launchingOffset = launchingOffsetArr[_launchingOffsetIdx]
                const _explosionIdx = utils.getRandomNumberInRange(0, explosionHighlightsArr.length - 1)
                const _explosion = explosionHighlightsArr[_explosionIdx]
        
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ONE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.ELEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TWO }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.TEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.THREE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.NINE }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.EIGHT }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FIVE }, { ..._launchingOffset }, _explosion)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SEVEN }, { ..._launchingOffset }, _explosion)
                await utils.sleep(launchingDelay)
                ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.SIX }, { ..._launchingOffset }, _explosion)
            },
        )   // finaleHighlightsArr.push
    },

    executeTest() {
        playLaunchSound()
        testEventArr[0]() 
    },

    executeRoutineShot() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, shotRoutineArr.length - 1)
        shotRoutineArr[idx]()
    },

    executeRoutineRipple(count: number) {
        playLaunchSound()
        // const idx = utils.getRandomNumberInRange(0, rippleRoutineArr.length - 1)
        // rippleRoutineArr[idx](count)
        rippleRoutineArr[0](count)
    },

    executeRoutineVolley() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, volleyRoutineArr.length - 1)
        volleyRoutineArr[idx]()
    },

    executeRoutineFinale() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, finaleRoutineArr.length - 1)
        finaleRoutineArr[idx]()
    },

    executeSpecialShot() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, shotSpecialArr.length - 1)
        shotSpecialArr[idx]()
    },

    executeSpecialRipple(count: number) {
        playLaunchSound()
        // const idx = utils.getRandomNumberInRange(0, rippleSpecialArr.length - 1)
        // rippleSpecialArr[idx](count)
        rippleSpecialArr[0](count)
    },

    executeSpecialVolley() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, volleySpecialArr.length - 1)
        volleySpecialArr[idx]()
    },

    executeSpecialFinale() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, finaleSpecialArr.length - 1)
        finaleSpecialArr[idx]()
    },

    executeHighlightsShot() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, shotHighlightsArr.length - 1)
        shotHighlightsArr[idx]()
    },

    executeHighlightsRipple(count: number) {
        playLaunchSound()
        // const idx = utils.getRandomNumberInRange(0, rippleHighlightsArr.length - 1)
        // rippleHighlightsArr[idx](count)
        rippleHighlightsArr[0](count)
    },

    executeHighlightsVolley() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, volleyHighlightsArr.length - 1)
        volleyHighlightsArr[idx]()
    },

    executeHighlightsFinale() {
        playLaunchSound()
        const idx = utils.getRandomNumberInRange(0, finaleHighlightsArr.length - 1)
        finaleHighlightsArr[idx]()
    },
}

function playLaunchSound() {
    if (stateManager.getVolumeState()) { 
        new Audio(ASSETS.SOUNDS.LAUNCH).play() 
    }
}

export default eventManager