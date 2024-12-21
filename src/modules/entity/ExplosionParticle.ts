import Particle from "./Particle"
import Coordinates from "../../types/Coordinates"
import ParticleSize from "../../types/ParticleSize"

export default class ExplosionParticle extends Particle {
    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        color: string
    ) {
        const size: ParticleSize = {
            width: 0.1,
            height: 0.1,
            depth: 0.1
        }

        super(currentAbsolutePoint, endRelativePoint, size, color)
    }

    protected preDestroyTask(): void {

    }
}