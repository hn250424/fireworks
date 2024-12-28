import Coordinates from "../../type/Coordinates"
import ParticleFactory from "../core/particle/ParticleFactory"

const particleEventManager = {
    launch(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) { ParticleFactory.createLaunchingParticle(currentAbsolutePoint, endRelativePoint) },
    // ignite(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, ms: number) { setTimeout(() => { this.launch(currentAbsolutePoint, endRelativePoint) }, ms) },

    burst(currentPoint: Coordinates, color: string) {
        const relativeEndPointArray = [
            { x: 10, y: 10, z: 0 },
            { x: 0, y: 10, z: -10 },
            { x: -10, y: 10, z: 0 },
            { x: 0, y: 10, z: 10 },

            { x: 7.07, y: 10, z: -7.07 },
            { x: -7.07, y: 10, z: -7.07 },
            { x: -7.07, y: 10, z: 7.07 },
            { x: 7.07, y: 10, z: 7.07 },

            // todo:
            { x: 13, y: 13, z: 0 },
            { x: 6.5, y: 13, z: 11.26 },
            { x: -6.5, y: 13, z: 11.26 },
            { x: -13, y: 13, z: 0 },
            { x: -6.5, y: 13, z: -11.26 },
            { x: 6.5, y: 13, z: -11.26 },

            { x: 16, y: 16, z: 0 },
            { x: 5.427, y: 16, z: 15.02 },
            { x: -5.427, y: 16, z: 15.02 },
            { x: -16, y: 16, z: 0 },
            { x: -5.427, y: 16, z: -15.02 },
            { x: 5.427, y: 16, z: -15.02 },
        ]

        relativeEndPointArray.forEach(endPoint => { ParticleFactory.createExplosionParticle({...currentPoint}, endPoint, color) })
    },

    bomb() {},
    erupt() {},
    bloom() {},
    twinkle() {},
    sparkle() {},
    chainBurst() {},
}

export default particleEventManager