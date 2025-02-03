import ASSETS from "../../definition/assets"
import POINT from "../../definition/point"
import TYPE from "../../definition/type"
import CVector3 from "../../type/CVector3"
import stateManager from "../core/stateManager"
import ParticleFactory from "../core/particle/ParticleFactory"
import * as utils from "../utils"

const rippleDelay = 500
const volleyAndFinaleDelay = 200
const volleyStep = 2
const finaleStep = 1

const launchingBaseArr: CVector3[] = []
const launchingOffsetArr: CVector3[] = []
const explosionRoutineArr: string[] = []
const explosionSpecialArr: string[] = []
const explosionHighlightsArr: string[] = []

const launchingBaseLength = Object.keys(POINT.LAUNCHING_BASE).length
const launchingBaseCenterIdx = Math.floor(launchingBaseLength / 2)

const eventManager = {
    init() {
        for (const v of Object.values(POINT.LAUNCHING_BASE)) { launchingBaseArr.push(v) }
        for (const v of Object.values(POINT.LAUNCHING_OFFSET)) { launchingOffsetArr.push(v) }
        for (const v of Object.values(TYPE.EXPLOSION.ROUTINE)) { explosionRoutineArr.push(v) }
        for (const v of Object.values(TYPE.EXPLOSION.SPECIAL)) { explosionSpecialArr.push(v) }
        for (const v of Object.values(TYPE.EXPLOSION.HIGHLIGHTS)) { explosionHighlightsArr.push(v) }
    },

    executeTest() {
        ParticleFactory.provideLaunchingParticle({ ...POINT.LAUNCHING_BASE.FOUR }, { ...POINT.LAUNCHING_OFFSET.LOWEST }, TYPE.EXPLOSION.HIGHLIGHTS.CHAIN_BURST)
    },

    shot(explosionType: string) {
        playLaunchSound()
        const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomIntInRange(2, 4) : utils.getRandomIntInRange(6, 8)
        ParticleFactory.provideLaunchingParticle(launchingBaseArr[_launchingBaseIdx], getLaunchingRandomOffset(), explosionType)
    },

    async ripple(explosionType: string, count: number) {
        utils.shuffle(launchingBaseArr)

        for (let i = 0; i < count; i++) {
            playLaunchSound()
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[i], getLaunchingRandomOffset(), explosionType)
            await utils.sleep(rippleDelay)
        }
    },

    async leftToRight(explosionType: string, step: number) {
        const _launchingOffset = getLaunchingRandomOffset()

        const _beginIdx = step === finaleStep ? 0 : utils.getRandomIntInRange(0, 1)
        const _increasing = utils.getRandomIntInRange(-1, 1)

        for (let i = _beginIdx; i < launchingBaseArr.length; i += step) {
            playLaunchSound()
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[i], _launchingOffset, explosionType)
            _launchingOffset.y += _increasing
            await utils.sleep(volleyAndFinaleDelay)
        }
    },

    async rightToLeft(explosionType: string, step: number) {
        const _launchingOffset = getLaunchingRandomOffset()

        const _beginIdx = step === finaleStep ? launchingBaseArr.length - 1: utils.getRandomIntInRange(launchingBaseArr.length - 2, launchingBaseArr.length - 1)
        const _increasing = utils.getRandomIntInRange(-1, 1)

        for (let i = _beginIdx; i > -1; i -= step) {
            playLaunchSound()
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[i], _launchingOffset, explosionType)
            _launchingOffset.y += _increasing
            await utils.sleep(volleyAndFinaleDelay)
        }
    },

    async centerToOuter(explosionType: string, step: number) {
        const _launchingOffset = getLaunchingRandomOffset()

        const _beginIdx = step === finaleStep ? 0 : utils.getRandomIntInRange(0, 1)
        const _increasing = utils.getRandomIntInRange(-1, 1)

        for (let i = _beginIdx; i <= launchingBaseCenterIdx; i += step) {
            playLaunchSound()
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[launchingBaseCenterIdx + i], _launchingOffset, explosionType)
            if (launchingBaseCenterIdx + i === launchingBaseCenterIdx) {
                _launchingOffset.y += _increasing
                await utils.sleep(volleyAndFinaleDelay)  
                continue
            }
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[launchingBaseCenterIdx - i], _launchingOffset, explosionType)
            _launchingOffset.y += _increasing
            await utils.sleep(volleyAndFinaleDelay)
        }
    },

    async outerToCenter(explosionType: string, step: number) {
        const _launchingOffset = getLaunchingRandomOffset()

        const _leftIdx = step === finaleStep ? 0 : utils.getRandomIntInRange(0, 1)
        const _rightIdx = _leftIdx === 0 ? launchingBaseArr.length - 1 : launchingBaseArr.length - 2
        const _increasing = utils.getRandomIntInRange(-1, 1)

        for (let i = 0; i <= launchingBaseCenterIdx; i += step) {
            playLaunchSound()
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[_leftIdx + i], _launchingOffset, explosionType)
            if (_leftIdx + i === 5) return
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[_rightIdx - i], _launchingOffset, explosionType)
            _launchingOffset.y += _increasing
            await utils.sleep(volleyAndFinaleDelay)
        }
    },

    executeRoutineShot() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionRoutineArr.length - 1)
        const _explosionType = explosionRoutineArr[_explosionIdx]
        this.shot(_explosionType)
    },

    executeRoutineRipple(count: number) {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionRoutineArr.length - 1)
        const _explosionType = explosionRoutineArr[_explosionIdx]
        this.ripple(_explosionType, count)
    },

    executeRoutineVolley() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionRoutineArr.length - 1)
        const _explosionType = explosionRoutineArr[_explosionIdx]

        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                this.leftToRight(_explosionType, volleyStep)
                break
            case 1:
                this.rightToLeft(_explosionType, volleyStep)
                break
            case 2:
                this.centerToOuter(_explosionType, volleyStep)
                break
            case 3:
                this.outerToCenter(_explosionType, volleyStep)
                break
        }
    },

    executeRoutineFinale() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionRoutineArr.length - 1)
        const _explosionType = explosionRoutineArr[_explosionIdx]

        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                this.leftToRight(_explosionType, finaleStep)
                break
            case 1:
                this.rightToLeft(_explosionType, finaleStep)
                break
            case 2:
                this.centerToOuter(_explosionType, finaleStep)
                break
            case 3:
                this.outerToCenter(_explosionType, finaleStep)
                break
        }
    },

    executeSpecialShot() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionSpecialArr.length - 1)
        const _explosionType = explosionSpecialArr[_explosionIdx]
        this.shot(_explosionType)
    },

    executeSpecialRipple(count: number) {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionSpecialArr.length - 1)
        const _explosionType = explosionSpecialArr[_explosionIdx]
        this.ripple(_explosionType, count)
    },

    executeSpecialVolley() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionSpecialArr.length - 1)
        const _explosionType = explosionSpecialArr[_explosionIdx]

        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                this.leftToRight(_explosionType, volleyStep)
                break
            case 1:
                this.rightToLeft(_explosionType, volleyStep)
                break
            case 2:
                this.centerToOuter(_explosionType, volleyStep)
                break
            case 3:
                this.outerToCenter(_explosionType, volleyStep)
                break
        }
    },

    executeSpecialFinale() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionSpecialArr.length - 1)
        const _explosionType = explosionSpecialArr[_explosionIdx]

        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                this.leftToRight(_explosionType, finaleStep)
                break
            case 1:
                this.rightToLeft(_explosionType, finaleStep)
                break
            case 2:
                this.centerToOuter(_explosionType, finaleStep)
                break
            case 3:
                this.outerToCenter(_explosionType, finaleStep)
                break
        }
    },

    executeHighlightsShot() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionHighlightsArr.length - 1)
        const _explosionType = explosionHighlightsArr[_explosionIdx]
        this.shot(_explosionType)
    },

    executeHighlightsRipple(count: number) {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionHighlightsArr.length - 1)
        const _explosionType = explosionHighlightsArr[_explosionIdx]
        this.ripple(_explosionType, count)
    },

    executeHighlightsVolley() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionHighlightsArr.length - 1)
        const _explosionType = explosionHighlightsArr[_explosionIdx]

        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                this.leftToRight(_explosionType, volleyStep)
                break
            case 1:
                this.rightToLeft(_explosionType, volleyStep)
                break
            case 2:
                this.centerToOuter(_explosionType, volleyStep)
                break
            case 3:
                this.outerToCenter(_explosionType, volleyStep)
                break
        }
    },

    executeHighlightsFinale() {
        const _explosionIdx = utils.getRandomIntInRange(0, explosionHighlightsArr.length - 1)
        const _explosionType = explosionHighlightsArr[_explosionIdx]

        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                this.leftToRight(_explosionType, finaleStep)
                break
            case 1:
                this.rightToLeft(_explosionType, finaleStep)
                break
            case 2:
                this.centerToOuter(_explosionType, finaleStep)
                break
            case 3:
                this.outerToCenter(_explosionType, finaleStep)
                break
        }
    },
}

function getLaunchingRandomOffset(): CVector3 {
    const _launchingOffsetIdx = utils.getRandomIntInRange(0, launchingOffsetArr.length - 1)
    return { ...launchingOffsetArr[_launchingOffsetIdx] }
}

function playLaunchSound() {
    if (stateManager.getVolumeState()) { 
        new Audio(ASSETS.SOUNDS.LAUNCH).play() 
    }
}

export default eventManager