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

const launchingBaseLength = Object.keys(POINT.LAUNCHING_BASE).length
const launchingBaseCenterIdx = Math.floor(launchingBaseLength / 2)

const eventManager = {
    init() {
        for (const v of Object.values(POINT.LAUNCHING_BASE)) { launchingBaseArr.push(v) }
        for (const v of Object.values(POINT.LAUNCHING_OFFSET)) { launchingOffsetArr.push(v) }
    },

    shot(explosionType: string) {
        playLaunchSound()
        const _launchingBaseIdx = (Math.random() > 0.5) ? utils.getRandomIntInRange(3, 4) : utils.getRandomIntInRange(6, 7)
        ParticleFactory.provideLaunchingParticle(launchingBaseArr[_launchingBaseIdx], getLaunchingRandomOffset(explosionType), explosionType)
    },

    async ripple(explosionType: string, count: number) {
        const copyedLaunchingBaseArr = {...launchingBaseArr}
        utils.shuffle(copyedLaunchingBaseArr)
    
        for (let i = 0; i < count; i++) {
            playLaunchSound()
            ParticleFactory.provideLaunchingParticle(copyedLaunchingBaseArr[i], getLaunchingRandomOffset(explosionType), explosionType)
            await utils.sleep(rippleDelay)
        }
    },

    volley(explosionType: string) {
        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                volleyAndFinale.leftToRight(explosionType, volleyStep)
                break
            case 1:
                volleyAndFinale.rightToLeft(explosionType, volleyStep)
                break
            case 2:
                volleyAndFinale.centerToOuter(explosionType, volleyStep)
                break
            case 3:
                volleyAndFinale.outerToCenter(explosionType, volleyStep)
                break
        }
    },

    finale(explosionType: string) {
        const c = utils.getRandomIntInRange(0, 3)
        switch(c) {
            case 0:
                volleyAndFinale.leftToRight(explosionType, finaleStep)
                break
            case 1:
                volleyAndFinale.rightToLeft(explosionType, finaleStep)
                break
            case 2:
                volleyAndFinale.centerToOuter(explosionType, finaleStep)
                break
            case 3:
                volleyAndFinale.outerToCenter(explosionType, finaleStep)
                break
        }
    },
}

const volleyAndFinale = {
    async leftToRight(explosionType: string, step: number) {
        const launchingOffset = getLaunchingRandomOffset(explosionType)
    
        const _beginIdx = step === finaleStep ? 0 : utils.getRandomIntInRange(0, 1)
    
        for (let i = _beginIdx; i < launchingBaseArr.length; i += step) {
            playLaunchSound()
            const copyedLaunchingOffset = {...launchingOffset}
            copyedLaunchingOffset.y += utils.getRandomIntInRange(-2, 2)
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[i], copyedLaunchingOffset, explosionType)
            await utils.sleep(volleyAndFinaleDelay)
        }
    },
    
    async rightToLeft(explosionType: string, step: number) {
        const launchingOffset = getLaunchingRandomOffset(explosionType)
    
        const _beginIdx = step === finaleStep ? launchingBaseArr.length - 1: utils.getRandomIntInRange(launchingBaseArr.length - 2, launchingBaseArr.length - 1)
    
        for (let i = _beginIdx; i > -1; i -= step) {
            playLaunchSound()
            const copyedLaunchingOffset = {...launchingOffset}
            copyedLaunchingOffset.y += utils.getRandomIntInRange(-2, 2)
            ParticleFactory.provideLaunchingParticle(launchingBaseArr[i], copyedLaunchingOffset, explosionType)
            // _launchingOffset.y += _increasing
            await utils.sleep(volleyAndFinaleDelay)
        }
    },
    
    async centerToOuter(explosionType: string, step: number) {
        const _launchingOffset = getLaunchingRandomOffset(explosionType)
    
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
        const _launchingOffset = getLaunchingRandomOffset(explosionType)
    
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
    }
}

function getLaunchingRandomOffset(explosionType: string): CVector3 {
    const _launchingOffsetIdx = utils.getRandomIntInRange(0, launchingOffsetArr.length - 1)
    const _launchingOffset = { ...launchingOffsetArr[_launchingOffsetIdx] }
    
    switch(explosionType) {
        case TYPE.EXPLOSION.FESTIVAL_ERUPT:
            _launchingOffset.y -= 5
            break

        case TYPE.EXPLOSION.CHAIN_BURST:
            _launchingOffset.y -= 3
            break
    }

    return _launchingOffset
}

function playLaunchSound() {
    if (stateManager.getVolumeState()) { 
        new Audio(ASSETS.SOUNDS.LAUNCH).play() 
    }
}

export default eventManager