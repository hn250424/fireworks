import Particle from "./Particle"
import Coordinates from "../../types/Coordinates"

export default class ExplosionParticle extends Particle {
    constructor(
        currentPoint: Coordinates,
        endPoint: Coordinates,
    ) {
        super(currentPoint, endPoint)
    }

    protected preDestroyTask(): void {
        
    }
}