import FIREWORK_TYPES from "../../definition/fireworkTypes"
import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"

const eventManager = {
    burst(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) { 
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, FIREWORK_TYPES.BURST) 
    },

    bomb(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, FIREWORK_TYPES.BOMB) 
    },

    erupt(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, FIREWORK_TYPES.ERUPT) 
    },

    bloom(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, FIREWORK_TYPES.BLOOM) 
    },

    twinkle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, FIREWORK_TYPES.TWINKLE) 
    },

    sparkle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, FIREWORK_TYPES.SPARKLE) 
    },

    chainBurst(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint, FIREWORK_TYPES.CHAIN_BURST) 
    },
}

export default eventManager