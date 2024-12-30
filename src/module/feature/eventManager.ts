import EXPLOSION_TYPES from "../../definition/EXPLOSION_TYPES"
import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"

const eventManager = {
    // 1
    burst(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) { 
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, EXPLOSION_TYPES.BURST) 
    },

    // 2, 3
    burstEvenLeftToRight() {},
    burstOddLeftToRight() {},
    busrtEvenRightToLeft() {},
    busrtOddRightToLeft() {},
    busrtEvenCenterToOuter() {},
    busrtOddCenterToOuter() {},
    burstEvenOuterToCenter() {},
    burstOddOuterToCenter() {},

    // 5
    burstLeftToRight() {},
    busrtRightToLeft() {},
    burstCenterToOuter() {},
    burstOuterToCenter() {},

    erupt(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, EXPLOSION_TYPES.ERUPT) 
    },

    bloom(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, EXPLOSION_TYPES.BLOOM) 
    },

    chainBurst(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, EXPLOSION_TYPES.CHAIN_BURST) 
    },
}

export default eventManager